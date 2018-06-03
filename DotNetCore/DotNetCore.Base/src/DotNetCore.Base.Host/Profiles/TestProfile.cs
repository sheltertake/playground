using AutoMapper;
using DotNetCore.Base.Host.Models;
using DotNetCore.Base.Host.Pocos;

namespace DotNetCore.Base.Host.Profiles
{
    public class TestProfile : Profile
    {
        public TestProfile()
        {
            CreateMap<TestPoco, TestModel>()
                .ForMember(x => x.Id, cfg => cfg.ResolveUsing(y => y.TestId))
                .ForMember(x => x.Title, cfg => cfg.ResolveUsing(y => y.Label));
        }
    }
}