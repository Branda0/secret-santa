import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Group() {
  const groupData = {
    name: "Costa",
    members: [
      { id: 1, name: "gabriel" },
      { id: 2, name: "Tania" },
      { id: 3, name: "Kelly" },
    ],
  };

  const router = useRouter();
  const { groupName } = router.query;
  console.log({ query: groupName });

  return (
    <>
      <Head>
        <title>Secret Santa - {groupName}</title>
        <meta name="description" content="secret santa group page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {groupData?.members.map((member, index) => {
        return (
          <Link
            key={member.id}
            href={{
              pathname: "[group]/[member]",
              query: {
                member: member.name,
                memberId: member.id,
                groupName: groupName,
              },
            }}
            as={`${groupName}/${member.name}`}
          >
            {member.name}
          </Link>
        );
      })}
    </>
  );
}
