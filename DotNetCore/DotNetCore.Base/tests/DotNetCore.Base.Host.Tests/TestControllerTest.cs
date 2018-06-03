using System.Collections.Generic;
using DotNetCore.Base.Host.Controllers;
using DotNetCore.Base.Host.Models;
using DotNetCore.Base.Host.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace DotNetCore.Base.Host.Tests
{
    [TestFixture]
    public class TestControllerTest
    {
        [Test]
        public void TestControllerTestIndex()
        {
            var mapper = MapperExtensions.CreateMapper();
            var sut = new TestController(mapper, new MemoryTestRepository());
            ViewResult res = (ViewResult)sut.Index(1);
            res.Model.Should().BeOfType<List<TestModel>>();
            if (res.Model is List<TestModel> items)
                items.ForEach(x => x.Completed.Should().BeFalse());
        }
    }
}
