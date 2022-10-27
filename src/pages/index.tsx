import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/nfe");
  }, [router]);

  return <div>Index</div>;
};

export default Index;
