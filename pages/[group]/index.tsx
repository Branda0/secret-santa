import Head from "next/head";

export default function Group() {
  const groupData = {
    name: "Costa",
    members: [
      { id: 1, name: "gabriel" },
      { id: 2, name: "Tania" },
      { id: 1, name: "Kelly" },
    ],
  };

  return (
    <>
      <Head>
        <title>Secret Santa - {groupData?.name}</title>
        <meta name="description" content="secret santa group page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {groupData?.members.map((member, index) => {
        return <p key={index}>{member.name}</p>;
      })}
    </>
  );
}
