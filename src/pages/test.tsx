import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Test: NextPage = () => {
  const session = useSession({ required: true });

  return <div>Test</div>;
};

export default Test;
