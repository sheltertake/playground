using System;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DotNetCore.Base.Host.Filters
{
    public class TestAuthorizationFilterAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            context.HttpContext.Response.Headers.Add("TestHeader", "TestValue");
        }
    }
}