using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Globalization;

namespace TEST_API.Helper
{
    public class AppException : Exception
    {
        public AppException() : base() { }
        public AppException(string message) : base(message) { }

        public AppException(string message, params object[] arg)
            : base(string.Format(CultureInfo.CurrentCulture, message, arg))
        {

        }

    }
}
