import Link from 'next/link';
const teamMembers = [
  {
    name: 'Chiara Scheurer',
    github: 'https://github.com/ChiaraScheurer',
    linkedIn: 'https://www.linkedin.com/in/chiara-scheurer/',
  },
  {
    name: 'Abdullah Atak',
    github: 'https://github.com/Abdryy',
    linkedIn: 'https://www.linkedin.com/in/abdullah-atak/',
  },
  {
    name: 'Christian Holst',
    github: 'https://github.com/ChromatisGit',
    linkedIn: 'https://www.linkedin.com/in/christian-business-it/',
  },
  {
    name: 'Jan Kuhnmünch',
    github: 'https://github.com/Zerdados',
    linkedIn: 'http://www.linkedin.com/in/jan-kuhnmuench/',
  },
  {
    name: 'Daniel Purtov',
    github: 'https://github.com/danielptv',
    linkedIn: 'https://www.linkedin.com/in/daniel-purtov/',
  },
] as { name: string; github: string; linkedIn?: string }[];

export default function TeamMembers() {
  return (
    <>
      {teamMembers.map((member) => (
        <tr key={member.name}>
          <td>{member.name}</td>
          <td>
            {
              <Link href={member.github} target="_blank" className="text-white" rel="noopener noreferrer" role="button">
                <i className="bi bi-github custom-opacity" style={{ color: '#333333' }} />
              </Link>
            }
          </td>
          <td>
            {member.linkedIn && (
              <Link href={member.linkedIn} target="_blank" className="text-dark" rel="noopener noreferrer">
                <i className="bi bi-linkedin custom-opacity" style={{ color: '#0082ca' }} />
              </Link>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
