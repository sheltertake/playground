using System;
using System.Collections.Generic;
using System.Text;
using Castle.Windsor;
using Castle.Windsor.Installer;
using NUnit.Framework;

namespace DotNetCore.Tests.CastleWindsor
{
    public abstract class TestBase
    {
        protected WindsorContainer container;

        [SetUp]
        public void Setup()
        {
            container = new WindsorContainer();
            container.Install(FromAssembly.Containing<Service>());
        }

        [OneTimeTearDown]
        public void Dispose()
        {
            container.Dispose();
        }
    }

}
