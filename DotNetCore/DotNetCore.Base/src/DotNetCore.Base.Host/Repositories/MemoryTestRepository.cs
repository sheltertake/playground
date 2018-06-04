using System.Collections.Generic;
using DotNetCore.Base.Host.Pocos;

namespace DotNetCore.Base.Host.Repositories
{
    public class MemoryTestRepository : ITestRepository
    {
        public IEnumerable<TestPoco> List()
        {
            return new List<TestPoco>()
            {
                new TestPoco() {TestId = 1, Label = "Test title"},
                new TestPoco() {TestId = 1, Label = "Test title 2"}
            };
        }
    }
}