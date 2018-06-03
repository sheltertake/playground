using System.Linq;
using AutoMapper;
using DotNetCore.Base.Host.Filters;
using DotNetCore.Base.Host.Models;
using DotNetCore.Base.Host.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCore.Base.Host.Controllers
{
    public class TestController : Controller
    {
        private readonly IMapper _mapper;
        private readonly ITestRepository _testRepository;

        public TestController(IMapper mapper, ITestRepository testRepository)
        {
            _mapper = mapper;
            _testRepository = testRepository;
        }

        [TestAuthorizationFilter]
        [TestActionFilter] 
        [TestResultFilter] 
        public IActionResult Index(int id)
        {
            var items = _testRepository.List().MapManyTo<TestModel>(_mapper).ToList();
            return View(items);
        }
    }
}