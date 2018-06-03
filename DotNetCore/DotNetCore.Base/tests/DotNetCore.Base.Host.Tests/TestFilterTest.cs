using System;
using System.Collections.Generic;
using System.Linq;
using DotNetCore.Base.Host.Filters;
using DotNetCore.Base.Host.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Moq;
using NUnit.Framework;

namespace DotNetCore.Base.Host.Tests
{
    [TestFixture]
    public class TestFilterTest
    {
        [Test]
        public void TestAuthFilterTest1()
        {
            // Arrange
            var httpResponse = new Mock<HttpResponse>();
            httpResponse.SetupGet(x => x.Headers).Returns(new HeaderDictionary());
            var httpContext = new Mock<HttpContext>();
            httpContext.SetupGet(x => x.Response).Returns(httpResponse.Object);
            var actionContext = new ActionContext(httpContext.Object,
                new Microsoft.AspNetCore.Routing.RouteData(),
                new ActionDescriptor());
            var authContext = new AuthorizationFilterContext(actionContext,
                Enumerable.Empty<IFilterMetadata>().ToList());

            var sut = new TestAuthorizationFilterAttribute();
            Action act = () => sut.OnAuthorization(authContext);
            act.Should().NotThrow();
            authContext.HttpContext.Response.Headers.Should().ContainKeys("TestHeader");
        }

        [Test]
        public void TestActionFilter()
        {
            //ActionExecutingContext(ActionContext actionContext, IList<IFilterMetadata> filters, IDictionary<string, object> actionArguments, object controller);
            //var result = new Mock<ViewResult>();
            //var testModel = new TestModel() {Id = 1, Title = "Test"};
            //var result = new Mock<IActionResult>();
            //result.SetupProperty(x => ((ViewResult).Model, new List<TestModel>()
            //{
            //    testModel
            //});
            var actionContext = new ActionContext(Mock.Of<HttpContext>(),
                new Microsoft.AspNetCore.Routing.RouteData(),
                new ActionDescriptor());
            var context1 = new ActionExecutingContext(actionContext,
                Enumerable.Empty<IFilterMetadata>().ToList(), 
                new Dictionary<string, object>()
                {
                   ["id"]=1
                }, null);
            //context1.Object.Result = new ViewResult())
            //{
            //    Model = 
            //};
            //context1.SetupGet(x => x.Result).Returns(result.Object);
            var context2 = new ActionExecutedContext(actionContext,
                Enumerable.Empty<IFilterMetadata>().ToList(), null);
            //context2.SetupGet(x => x.Result).Returns(result.Object);

            var sut = new TestActionFilterAttribute();
            Action act1 = () => sut.OnActionExecuting(context1);
            act1.Should().NotThrow();
            Action act2 = () => sut.OnActionExecuted(context2);
            act2.Should().NotThrow();
            //testModel.TicksBeforeActionFilter.Should().Be(0);
            //testModel.TicksAfterActionFilter.Should().BeGreaterThan(0);
            //testModel.TicksBeforeResultFilter.Should().BeGreaterThan(0);
            //testModel.TicksAfterResultFilter.Should().Be(0);
        }
    }
}