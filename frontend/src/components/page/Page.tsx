interface PageProps {
   children: React.ReactNode | React.ReactNode[];
}

const Page = ({ children }: PageProps) => {
   return <main className="content dark:bg-night">{children}</main>;
};

export default Page;
