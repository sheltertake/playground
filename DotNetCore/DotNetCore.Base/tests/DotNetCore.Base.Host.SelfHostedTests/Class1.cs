using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using NUnit.Framework;

namespace DotNetCore.Base.Host.SelfHostedTests
{
    [TestFixture]
    public class Class1
    {
        [Test]
        public void MyTest()
        {
            var webHostBuilder = new WebHostBuilder();
            //webHostBuilder.ConfigureServices(
            //    s => s.AddSingleton < IStartupConfigurationService, TestStartupConfigurationService <[DBCONTEXT_TYPE] >> ());
            webHostBuilder.UseStartup<Startup>();
            var testServer = new TestServer(webHostBuilder);

            var response = testServer.CreateClient().GetAsync("/Test/Index/1").Result;
            response.EnsureSuccessStatusCode();
        }
    }
}
