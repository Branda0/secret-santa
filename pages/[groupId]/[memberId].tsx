import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Member() {
  const router = useRouter();
  const { member, group, memberId } = router.query;

  const [memberID, setMemberID] = useState(memberId);
  const [count, setCount] = useState(2);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };
  console.log("member page");
  const path = router.pathname;
  const asPath = router.asPath;

  const fetchMemberId = () => {};

  useEffect(() => {
    // if (!memberId);
  }, []);
  return (
    <>
      <Head>
        <title>
          Secret Santa - {group} - {member}
        </title>
        <meta name="description" content="secret santa group page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>{group}</p>
      <button onClick={increment}> up count</button>
      <p> {member}</p>
      <p> {memberId}</p>
      <p> {memberID}</p>
      <p>{count}</p>
    </>
  );
}
