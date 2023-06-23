import { FC } from 'react';
import { PiChatsLight } from 'react-icons/pi';
import { RxDotFilled } from 'react-icons/rx';
import { GoFileDirectoryFill, GoArrowDown } from 'react-icons/go';
import { homeTopics } from 'fake-api';
import { Disclosure } from '@headlessui/react';

const Home: FC = () => {
   return (
      <>
         <div>
            <div id="home-topics" className="container mx-auto py-4 sm:py-8 max-sm:px-4 space-y-6">
               {homeTopics.map((topic, key) => (
                  <Disclosure key={key} defaultOpen>
                     <ul>
                        <li className="header">
                           <ul className="text-sm table table-fixed w-full h-10 leading-10 bg-night-900 rounded-t text-white/80">
                              <li className="table-cell align-middle font-semibold overflow-hidden whitespace-nowrap text-ellipsis relative w-16 border-r border-r-gray-500">
                                 <Disclosure.Button className="w-full focus:outline-none flex items-center justify-center">
                                    <GoArrowDown size={'20px'} />
                                 </Disclosure.Button>
                              </li>
                              <li className="table-cell align-middle font-semibold sm:w-3/6 px-3 border-r border-r-gray-500 text-left">
                                 {topic.main_topic_header}
                              </li>
                              <li className="table-cell align-middle font-semibold max-sm:!hidden px-2 bg-night-600 border-r border-r-gray-500 text-center">
                                 Son Mesaj
                              </li>
                              <li className="table-cell align-middle font-semibold max-sm:!hidden px-2 bg-night-600 text-center">
                                 Konu / Mesaj
                              </li>
                           </ul>
                        </li>
                        <li className="body">
                           {topic.childs &&
                              topic.childs.map((child, childKey) => (
                                 <Disclosure.Panel
                                    key={childKey}
                                    as={'ul'}
                                    className="table table-fixed w-full bg-night-800 border-b border-b-gray-500 text-white/80 text-sm"
                                 >
                                    <li className="table-cell align-middle w-16 text-gray-400 py-4 border-r border-r-gray-500">
                                       <PiChatsLight className="mx-auto" size={'2rem'} />
                                    </li>
                                    <li className="table-cell align-middle px-3 py-1.5 sm:w-3/6 border-r border-r-gray-500 text-left">
                                       <div className="mb-1">
                                          <p>{child.title}</p>
                                       </div>
                                       <div className="max-sm:hidden mb-1">
                                          <span className="text-xs">{child.description}</span>
                                       </div>
                                       <div className="friends text-xs">
                                          {child.friends &&
                                             child.friends.map((friend, friendKey) => (
                                                <div key={friendKey} className="inline-block mr-4">
                                                   <div className="flex items-center">
                                                      <GoFileDirectoryFill className="mr-1.5 text-rose-400 dark:text-violet-400" />
                                                      <h1>{friend}</h1>
                                                   </div>
                                                </div>
                                             ))}
                                       </div>
                                    </li>
                                    <li className="table-cell align-middle px-3 max-sm:hidden border-r border-r-gray-500 text-left text-[13px]">
                                       <div className="mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
                                          <span title="x Konusunda yeni mesaj">
                                             {child.last_message.topic_title}
                                          </span>
                                       </div>
                                       <div>
                                          <div className="w-1/2 mr-0.5 float-left overflow-hidden whitespace-nowrap text-ellipsis">
                                             {child.last_message.user}
                                          </div>
                                          <div className="float-right text-gray-400">
                                             {child.last_message.date}
                                          </div>
                                       </div>
                                    </li>
                                    <li className="table-cell align-middle px-3 max-sm:hidden border-r border-r-gray-500 text-center text-[13px]">
                                       <div>
                                          <span className="text-gray-400">Konu Sayısı: </span>
                                          <span> {child.details.not}</span>
                                       </div>
                                       <div>
                                          <RxDotFilled
                                             className="mx-auto text-rose-400 dark:text-violet-400"
                                             size="1.25rem"
                                          />
                                       </div>
                                       <div>
                                          <span className="text-gray-400">Mesaj Sayısı: </span>
                                          <span>{child.details.nom}</span>
                                       </div>
                                    </li>
                                 </Disclosure.Panel>
                              ))}
                        </li>
                     </ul>
                  </Disclosure>
               ))}
            </div>
         </div>
      </>
   );
};

export default Home;
