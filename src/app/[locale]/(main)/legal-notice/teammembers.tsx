import Link from 'next/link';

export default function TeamMemberRows() {
  const teamMembers = [
    {
      name: 'Chiara Scheurer',
      github: '#',
      linkedin: '#',
    },
    {
      name: 'Abdullah Atak',
      github: 'https://github.com/Abdryy',
      linkedin: 'https://www.linkedin.com/in/abdullah-atak-9b1759314/',
    },
    {
      name: 'Christian Holst',
      github: '#',
      linkedin: '#',
    },
    {
      name: 'Jan Kuhnmünch',
      github: '#',
      linkedin: '#',
    },
    {
      name: 'Daniel Purtov',
      github: '#',
      linkedin: '#',
    },
  ];

  return (
    <>
      {teamMembers.map((member) => (
        <tr key={member.name}>
          <td>{member.name}</td>
          <td>
            {member.github !== '#' && (
              <Link href={member.github} target="_blank" className="text-dark" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
              </Link>
            )}
          </td>
          <td>
            {member.linkedin !== '#' && (
              <Link href={member.linkedin} target="_blank" className="text-dark" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
              </Link>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
