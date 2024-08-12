import React from 'react';

const teamMembers = [
  {
    name: 'Aiona Hernandez',
    githubUrl: 'https://github.com/aionarae',
    profilePic: 'https://avatars.githubusercontent.com/aionarae'
  },
  {
    name: 'Brett Czerwinski',
    githubUrl: 'https://github.com/Bcz25',
    profilePic: 'https://avatars.githubusercontent.com/Bcz25'
  },
  {
    name: 'Sean Madigan',
    githubUrl: 'https://github.com/Sean-K-Madigan',
    profilePic: 'https://avatars.githubusercontent.com/Sean-K-Madigan'
  },
  {
    name: 'Dayel Przybyla',
    githubUrl: 'https://github.com/ddprzy37',
    profilePic: 'https://avatars.githubusercontent.com/ddprzy37'
  },
  {
    name: 'Patrick Granger',
    githubUrl: 'https://github.com/U6028449',
    profilePic: 'https://avatars.githubusercontent.com/U6028449'
  }
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-message">
        Thanks for shopping with us
      </div>
      <div className="team-members">
        {teamMembers.map(member => (
          <div key={member.githubUrl} className="team-member">
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={member.profilePic} alt={member.name} className="profile-pic" />
            </a>
            <span className="name">{member.name}</span>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;