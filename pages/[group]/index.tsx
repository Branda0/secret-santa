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
  const { group } = router.query;
  console.log("group page");

  if (group !== "Costa") {
    console.log("FAIL");
  }

  return (
    <>
      <Head>
        <title>Secret Santa - {group}</title>
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
                group: group,
              },
            }}
            as={`${group}/${member.name}`}
          >
            {member.name}
          </Link>
        );
      })}
    </>
  );
}
