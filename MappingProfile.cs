
using AutoMapper;
using ProductsApp.Models;

namespace ProductsApp
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //change type from UserForRegistrationDto to User
            CreateMap<UserForRegistrationDto, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
        }
    }
}