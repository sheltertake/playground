using System;
using System.Collections.Generic;
using DotNetCore.Base.Host.Helpers;
using DotNetCore.Base.Host.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DotNetCore.Base.Host.Filters
{
    public class TestResultFilterAttribute : Attribute, IResultFilter
    {
        public void OnResultExecuting(ResultExecutingContext context)
        {
            //if ((int)context.ActionArguments["id"] == 1)
            //    return;
            if (context.Result is ViewResult result &&
                result.Model is List<TestModel> items)
            {
                foreach (var item in items)
                    item.Completed = true;

            }

            context.Result.SetTicks(x => x.TicksBeforeResultFilter = DateTime.Now.Ticks);
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {
            if (context.Exception != null)
                return;

            context.Result.SetTicks(x => x.TicksAfterResultFilter = DateTime.Now.Ticks);
        }
    }
}