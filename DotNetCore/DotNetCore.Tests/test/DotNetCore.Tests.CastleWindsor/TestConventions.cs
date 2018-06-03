using NUnit.Framework;
using System;
using System.IO;
using System.Reflection;
using Castle.Windsor.Installer;
using FluentAssertions;

namespace DotNetCore.Tests.CastleWindsor
{
    [TestFixture]
    public class TestConventions : TestBase
    {
        [Test]
        public void TestConvention()
        {
           var consumer = container.Resolve<Consumer>();
            consumer.Get("test").Should().Be("test");
        }
    }

    public class Consumer
    {
        private readonly IService _service;

        public Consumer(IService service)
        {
            _service = service;
        }

        public string Get(string what)
        {
            return _service.Get(what);
        }
    }
    public class Service : IService
    {
        public string Get(string what)
        {
            return what;
        }
    }

    public interface IService : IServiceSingleton
    {
        string Get(string what);
    }

    public interface IServiceSingleton
    {
    }
}
