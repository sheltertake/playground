using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace DotNetCore.Tests.CastleWindsor
{
    public class ConventionInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Classes.FromAssemblyContaining(typeof(IService))
                //.Where(Component.IsInSameNamespaceAs<IServiceSingleton>())
                .Pick()
                .WithService.DefaultInterfaces()
                .LifestyleSingleton());

            //container.Register(
            //    Component.For<Consumer>().ImplementedBy<Consumer>().LifestyleTransient()
            //);
        }
    }
}