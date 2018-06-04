using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Castle.Core;
using Castle.DynamicProxy;
using Castle.MicroKernel.Registration;
using FluentAssertions;
using NUnit.Framework;

namespace DotNetCore.Tests.CastleWindsor
{
    [TestFixture]
    public class TestInterceptions : TestBase
    {
        [Test]
        public void TestInterception()
        {

            container.Register(
                    Component.For<CacheInterceptor>()
                        .Named(Guid.NewGuid().ToString())
                        .IsDefault()
                        .LifestyleTransient(),
                Component.For<IClassToBeIntercepted>()
                    .ImplementedBy<ClassToBeIntercepted>()
                    .Interceptors(InterceptorReference.ForType<CacheInterceptor>()).First
                    .Named(Guid.NewGuid().ToString())
                    .IsDefault()
                    .LifestyleSingleton()
            );

            var consumer = container.Resolve<IClassToBeIntercepted>();
            var res1 = consumer.Get(1);
            //var res2 = consumer.Get(2);
            res1.Should().Be(1);
            //res2.Should().Be(1);
            
        }
    }

    [Interceptor(typeof(CacheInterceptor))]
    public class ClassToBeIntercepted : IClassToBeIntercepted
    {
        [Cache(CacheTypes.CacheAfterFirstUsage)]
        public int Get(int input)
        {
            return input;
        }
    }

    public interface IClassToBeIntercepted
    {
        int Get(int input);
    }

    public class CacheInterceptor : IInterceptor
    {
        private readonly CacheAdapter _cache;
        private readonly ConfigurationForType _configurationForType;

        public CacheInterceptor(CacheAdapter cache,
            ConfigurationForType configurationForType)
        {
            _cache = cache;
            _configurationForType = configurationForType;
        }

        public void Intercept(IInvocation invocation)
        {
            if (!_configurationForType.EnabledCache)
            {
                invocation.Proceed();
                return;
            }

            var method = invocation.Method;
            //ugly hack
            if (method.IsGenericMethod && !_configurationForType.CachedMethods.Contains(method, MethodInfoComparer.Instance))
            {
                invocation.Proceed();
                return;
            }
            var proxy = (ICachingComponent)invocation.Proxy;
            var arguments = invocation.Arguments;

            var keyAndItsDependingKeys = _configurationForType.CacheKey.GetAndPutKey(_configurationForType.ComponentType, proxy, method, arguments);
            if (keyAndItsDependingKeys.Key == null)
            {
                invocation.Proceed();
            }
            else
            {
                var hasCalledOriginalMethod = false;
                var result = _cache.GetAndPutIfNonExisting(keyAndItsDependingKeys, invocation.Method, invocation.Arguments, () =>
                {
                    invocation.Proceed();
                    hasCalledOriginalMethod = true;
                    return invocation.ReturnValue;
                });
                if (!hasCalledOriginalMethod)
                {
                    invocation.ReturnValue = result;
                }
            }
        }
    }
    [Serializable]
    public class CastleProxyFactory : IProxyFactory
    {
        private static readonly ProxyGenerator generator = new ProxyGenerator(new DefaultProxyBuilder(new ModuleScope(false, true)));
        private CacheAdapter _cache;

        public void Initialize(CacheAdapter cache)
        {
            _cache = cache;
        }

        public T CreateProxy<T>(ConfigurationForType configurationForType, params object[] parameters) where T : class
        {
            var type = typeof(T);
            var cacheInterceptor = new CacheInterceptor(_cache, configurationForType);
            var options = new ProxyGenerationOptions(new CacheProxyGenerationHook(configurationForType.CachedMethods));
            options.AddMixinInstance(createCachingComponent(configurationForType));
            try
            {
                if (type.IsClass)
                {
                    return (T)generator.CreateClassProxy(configurationForType.ComponentType.ConcreteType, options, parameters, cacheInterceptor);
                }
                var target = Activator.CreateInstance(configurationForType.ComponentType.ConcreteType, parameters);
                return generator.CreateInterfaceProxyWithTarget((T)target, options, cacheInterceptor);
            }
            catch (MissingMethodException createInstanceEx)
            {
                throw new ArgumentException("Cannot instantiate proxy", createInstanceEx);
            }
        }

        public T CreateProxyWithTarget<T>(T uncachedComponent, ConfigurationForType configurationForType) where T : class
        {
            var cacheInterceptor = new CacheInterceptor(_cache, configurationForType);
            var options = new ProxyGenerationOptions(new CacheProxyGenerationHook(configurationForType.CachedMethods));
            options.AddMixinInstance(createCachingComponent(configurationForType));
            return typeof(T).IsClass ?
                    generator.CreateClassProxyWithTarget(uncachedComponent, options, cacheInterceptor) :
                    generator.CreateInterfaceProxyWithTarget(uncachedComponent, options, cacheInterceptor);
        }

        private ICachingComponent createCachingComponent(ConfigurationForType configurationForType)
        {
            return new CachingComponent(_cache, configurationForType.CacheKey, configurationForType);
        }
    }
    public class CacheProxyGenerationHook : IProxyGenerationHook
    {
        private readonly IEnumerable<MethodInfo> _cachedMethods;

        public CacheProxyGenerationHook(IEnumerable<MethodInfo> cachedMethods)
        {
            _cachedMethods = cachedMethods;
        }

        public bool ShouldInterceptMethod(Type type, MethodInfo methodInfo)
        {
            return isMethodMarkedForCaching(methodInfo);
        }

        public void NonProxyableMemberNotification(Type type, MemberInfo memberInfo)
        {
        }

        public void MethodsInspected()
        {
        }

        private bool isMethodMarkedForCaching(MethodInfo key)
        {
            //ugly hack for now
            if (key.IsGenericMethod)
                return true;
            return _cachedMethods.Contains(key, MethodInfoComparer.Instance);
        }

        public override bool Equals(object obj)
        {
            var casted = obj as CacheProxyGenerationHook;
            return casted != null && casted._cachedMethods.SequenceEqual(_cachedMethods, MethodInfoComparer.Instance);
        }

        public override int GetHashCode()
        {
            return _cachedMethods.GetHashCode();
        }
    }

    //public class CacheInterceptor
    //    : IInterceptor
    //{
    //    private readonly IDictionary<string, object> _cacheRepository;

    //    public CacheInterceptor(IDictionary<string, object> cacheRepository)
    //    {
    //        _cacheRepository = cacheRepository;
    //    }

    //    public CacheInterceptor()
    //        : this(new Dictionary<string, object>())
    //    {

    //    }

    //    public void Intercept(IInvocation invocation)
    //    {
    //        var cacheAttribute = invocation.MethodInvocationTarget.GetCustomAttributes(typeof(CacheAttribute), false).OfType<CacheAttribute>().FirstOrDefault();
    //        if (cacheAttribute == null)
    //            invocation.Proceed();
    //        else
    //        {
    //            var args = GetArgumentInfos(invocation);
    //            var fullMethodHash = GetHashForCacheType(invocation, args, cacheAttribute);

    //            object result;
    //            if (_cacheRepository.TryGetValue(fullMethodHash, out result))
    //            {
    //                invocation.ReturnValue = result;
    //            }
    //            else
    //            {
    //                invocation.Proceed();
    //                result = invocation.ReturnValue;
    //                //_cacheRepository.Add(fullMethodHash, result);
    //            }
    //        }
    //    }

    //    private static string GetHashForCacheType(IInvocation invocation, ArgumentInfo[] args, CacheAttribute cacheAttribute)
    //    {
    //        string argsHash = string.Empty;
    //        if (cacheAttribute.CacheType == CacheTypes.CacheForSameParameters)
    //            argsHash = string.Join("|", args.Select(a => string.Format("{0}:{1}", a.Argument.Name, a.Value)));
    //        else if (cacheAttribute.CacheType == CacheTypes.CacheAfterFirstUsage)
    //            argsHash = String.Empty;

    //        string fullMethodHash = string.Format("Method=[{0}] Parameters=[{1}]", invocation.MethodInvocationTarget.Name, argsHash);
    //        return fullMethodHash;
    //    }

    //    private ArgumentInfo[] GetArgumentInfos(IInvocation invocation)
    //    {
    //        ArgumentInfo[] args = null;
    //        //string methodHash = string.Format("Method=[{0}]", invocation.MethodInvocationTarget.Name);
    //        //if (!_arguments.TryGetValue(methodHash, out args))
    //        //{
    //        args = invocation.MethodInvocationTarget.GetParameters()
    //            .Zip(invocation.Arguments, (p, v) => new ArgumentInfo
    //            {
    //                Argument = p,
    //                Value = v
    //            }).ToArray();
    //        //_arguments.Add(methodHash, args);
    //        //}
    //        return args;
    //    }
    //}

    //public struct ArgumentInfo
    //{
    //    public ParameterInfo Argument { get; set; }
    //    public object Value { get; set; }
    //}

    //public enum CacheTypes
    //{
    //    CacheForSameParameters,
    //    CacheAfterFirstUsage
    //}

    //[AttributeUsage(AttributeTargets.Method | AttributeTargets.Property, AllowMultiple = false)]
    //public class CacheAttribute
    //    : Attribute, IInterceptorAttribute
    //{
    //    public CacheTypes CacheType { get; set; }

    //    public CacheAttribute(CacheTypes cacheType)
    //    {
    //        CacheType = cacheType;
    //    }
    //}
    //public interface IInterceptorAttribute
    //{

    //}
}