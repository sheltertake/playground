using System.Collections.Generic;
using DotNetCore.Base.Host.Pocos;

namespace DotNetCore.Base.Host.Repositories
{
    public interface ITestRepository
    {
        IEnumerable<TestPoco> List();
    }
}