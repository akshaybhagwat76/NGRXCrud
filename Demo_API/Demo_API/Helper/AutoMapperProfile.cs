using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TEST_API.Model;
using AutoMapper;
using TEST_API.Entities;

namespace TEST_API.Helper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Users, UserModel>();
            CreateMap<Register, Users>();
        }
    }
}
