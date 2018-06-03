using System;
using System.Collections.Generic;
using DotNetCore.Base.Host.Controllers;
using DotNetCore.Base.Host.Helpers;
using DotNetCore.Base.Host.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DotNetCore.Base.Host.Filters
{
    public class TestActionFilterAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {

            context.Result.SetTicks(x => x.TicksBeforeActionFilter = DateTime.Now.Ticks);

            if ((int) context.ActionArguments["id"] == 1)
                return;
            
            throw new Exception("id not allowed");
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception != null)
                return;

            context.Result.SetTicks(x => x.TicksAfterActionFilter = DateTime.Now.Ticks);

        }
    }
}