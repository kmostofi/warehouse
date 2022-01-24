using System;
namespace WAPI.Data
{

    public class CallCounterService : iCallCounter
    {
        //Int32 _counter;

        public int GetCallCounter()
        {

            return Program.CallCounterValue++; ;
        }

    }
}
