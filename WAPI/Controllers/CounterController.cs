using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WAPI.Data;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CounterController : Controller
    {
        private iCallCounter _counterService;

        public CounterController(iCallCounter callCounter)
        {
            _counterService = callCounter;
        }
        // GET: /<controller>/
        [HttpGet]
        public int Index()
        {

            return _counterService.GetCallCounter();
        }
    }
}
