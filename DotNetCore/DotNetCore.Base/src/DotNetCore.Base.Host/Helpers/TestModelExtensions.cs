using System;
using System.Collections.Generic;
using DotNetCore.Base.Host.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCore.Base.Host.Helpers
{
    public static class TestModelExtensions
    {
        public static IEnumerable<TestModel> SetTicks(this List<TestModel> src, Action<TestModel> action)
        {
            src.ForEach(action);
            return src;
        }

        public static void SetTicks(this IActionResult src, Action<TestModel> action)
        {
            if (src is ViewResult result &&
                result.Model is List<TestModel> items)
            {
                items.SetTicks(action);
            }
        }
    }
}
