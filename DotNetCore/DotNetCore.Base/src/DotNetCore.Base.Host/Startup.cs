using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using DotNetCore.Base.Host.Controllers;
using DotNetCore.Base.Host.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DotNetCore.Base.Host
{
    public static class MapperExtensions
    {
        public static IServiceCollection AddMapper(this IServiceCollection src)
        {
            /* Automapper */
            var mapper = CreateMapper();

            return src.AddSingleton<IMapper>(provider => mapper);
        }

        public static IMapper CreateMapper()
        {
            var config = new MapperConfiguration(cfg => { cfg.AddProfiles(new List<Assembly>() {typeof(Startup).Assembly}); });
            var mapper = config.CreateMapper();
            return mapper;
        }

        public static TDest MapTo<TDest>(this object source, IMapper mapper) where TDest : class, new()
        {
            return mapper.Map<TDest>(source);
        }

        public static IEnumerable<TDest> MapManyTo<TDest>(this IEnumerable<object> src, IMapper mapper)
            where TDest : class, new()
        {
            return src.Select(x => x.MapTo<TDest>(mapper));
        }
    }
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddMapper();
            services.AddSingleton<ITestRepository, MemoryTestRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
