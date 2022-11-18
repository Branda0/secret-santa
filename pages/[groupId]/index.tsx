import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getGroup } from "../../lib/groups";

// import { Group } from "../../types/types";
import Layout from "../../components/Layout";
import { GroupType } from "../../types/types";

export default function Group({ group }: { group: GroupType }) {
  const router = useRouter();
  const query = router.query;

  console.log(group);

  return (
    <>
      <Head>
        <title>Secret Santa -</title>
        <meta name="description" content="secret santa group page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <p>YOYO </p>
        {/* {groupData?.members.map((member, index) => {
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
      })} */}
      </Layout>
    </>
  );
}

// server side rendering - getting all groups from database on page load
export const getServerSideProps = async (contex) => {
  const { groupId } = contex.params;
  console.log("+++++++++++++++++=");
  console.log(contex.params);
  console.log(groupId);
  return {
    notFound: true,
  };

  try {
    const group = await getGroup(groupId);
    console.log(group);

    return {
      props: { group: JSON.parse(JSON.stringify(group)) },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};
