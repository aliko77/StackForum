import { UserProps } from 'types';

export type MainTopicHeaderProps = {
   header: string;
   total_subtopic_header: number;
   total_opened_topics: number;
   creator: UserProps;
};
