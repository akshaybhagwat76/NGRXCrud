using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TEST_API.Entities;
using TEST_API.Helper;

namespace TEST_API.Services
{
    public interface IUserservices
    {
        Users Authenticate(string Username, string Password);
        IEnumerable<Users> GetAll();
        Users GetById(int Id);
        Users Create(Users user, string Password);
        void Update(Users user, string password = null);
        void Delete(int id);

    }
    public class UserService : IUserservices
    {
        private DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public Users Authenticate(string Username, string Password)
        {
            if (string.IsNullOrEmpty(Username) || string.IsNullOrEmpty(Password))
                return null;

            var user = _context.users.SingleOrDefault(x => x.Username == Username);
            if (user == null)
            {
                return null;
            }
            if (!VerifyPasswordHash(Password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }
            return user;
        }
        public IEnumerable<Users> GetAll()
        {
            return _context.users;
        }
        public Users GetById(int Id)
        {
            return _context.users.Find(Id);
        }
        public Users Create(Users user, string Password)
        {
            if (string.IsNullOrWhiteSpace(Password))
            {
                throw new AppException("Password is required");
            }
            if (_context.users.Any(x => x.Username == user.Username))
            {
                throw new AppException("Username \"" + user.Username + "\" is already taken");
            }
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(Password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            _context.users.Add(user);
            _context.SaveChanges();
            return user;
        }
        public void Update(Users userParam, string password = null)
        {
            var user = _context.users.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
            {
                // throw error if the new username is already taken
                if (_context.users.Any(x => x.Username == userParam.Username))
                    throw new AppException("Username " + userParam.Username + " is already taken");

                user.Username = userParam.Username;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userParam.Firstname))
                user.Firstname = userParam.Firstname;

            if (!string.IsNullOrWhiteSpace(userParam.Lastname))
                user.Lastname = userParam.Lastname;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.users.Update(user);
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var user = _context.users.Find(id);
            if (user != null)
            {
                _context.users.Remove(user);
                _context.SaveChanges();
            }
        }
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}
