import Head from "next/head";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import { RouterOutputs, api } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

type Purchase = {
  id: number;
  stock: string;
  purchaseDate: string;
  purchaseCost: number;
  purchaseQty: number;
};

const purchases: Purchase[] = [
  {
    id: 1,
    stock: "SYI.AX",
    purchaseDate: "2021-02-01",
    purchaseCost: 1.5,
    purchaseQty: 20,
  },
  {
    id: 2,
    stock: "SYI.AX",
    purchaseDate: "2022-02-01",
    purchaseCost: 50,
    purchaseQty: 20,
  },
];

const PostView = (props: PostWithUser) => {
  const { id, content, author, createdAt } = props;
  console.log(createdAt);
  return (
    <div className="flex gap-3 border-b border-slate-400 p-8" key={id}>
      <img src={author?.imageUrl} className="me-2 h-10 w-10 rounded-full" />
      <div className="flex flex-col">
        <div className="flex text-slate-400">
          <span className="text-slate-300">@{author?.username}</span>
          <span className="px-2 font-thin">·</span>
          <span>{dayjs(createdAt).fromNow()}</span>
        </div>
        <span>{content}</span>
      </div>
    </div>
  );
};

const CreatePostWizard = () => {
  const { user } = useUser();
  console.log(user?.id);

  if (!user) return null;

  return (
    <div className="flex w-full gap-4 border-b p-4">
      <img
        src={user.imageUrl}
        alt="Profile Image"
        className="h-14 w-14 rounded-full"
      />
      <input
        placeholder="Type some stuff"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

export default function Home() {
  const user = useUser();

  const { data, isLoading } = api.posts.getAll.useQuery();
  // const { quote } = api.yahooFinance.quote("SYI:AX").run();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex justify-between border-b border-slate-400 bg-slate-800 p-4">
            <UserButton afterSignOutUrl="/" />
            {user.isSignedIn ? <SignOutButton /> : <SignInButton />}
          </div>
          {user.isSignedIn && <CreatePostWizard />}
          <div className="flex flex-col">
            {data?.map((fullPost) => (
              <PostView {...fullPost} key={fullPost.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
