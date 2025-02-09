"use client";

import {
  ArrowUpRight,
  CodeXml,
  EllipsisVertical,
  LogOut,
  MessageSquareText,
  PaintbrushVertical,
  Pencil,
  Save,
  Search,
  Settings,
  SquarePen,
  Trash,
  UserRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./toogle-mode";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import axios, { AxiosError } from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

interface ThreadType {
  id: string;
  userId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export function AppSidebar() {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [threadName, setThreadName] = useState("");
  const [allThreads, setAllThreads] = useState<ThreadType[]>();
  const [changedName, setChangedName] = useState("");

  async function createThread() {
    try {
      const response = await axios.post("/api/thread", {
        name: threadName,
        userId: session?.user.id,
      });
      toast({
        title: "Thread created 😊",
        description: "Get ready to learn in a new way ",
      });
      location.reload();
    } catch (error) {
      const errorMessage = error as AxiosError;
      toast({
        title: "Oops! There were some error",
        description: (errorMessage.response?.data as any).message,
        variant: "destructive",
      });
    }
  }

  async function getThreads() {
    try {
      const response = await axios.get(
        `/api/thread?userId=${session?.user.id}`
      );
      setAllThreads(response.data.threads);
    } catch (error) {
      toast({
        title: "Oops! There were some error",
        description: "Unable to fetch Threads 🥲",
        variant: "destructive",
      });
    }
  }

  async function renameThread(id: string) {
    try {
      const response = await axios.put("/api/thread", {
        name: changedName,
        id,
      });
      toast({
        title: "Renamed thread 😊",
        description: "Thread has been renamed successfully",
      });
      location.reload();
    } catch (error) {
      toast({
        title: "Oops! There were some error",
        description: "Unable to rename Thread 🥲",
        variant: "destructive",
      });
    }
  }

  async function deleteThread(id: string) {
    try {
      const response = await axios.delete(`/api/thread?id=${id}`);
      toast({
        title: "Deleted thread 😊",
        description: "Thread has been deleted successfully",
      });
      location.reload();
    } catch (error) {
      toast({
        title: "Oops! There were some error",
        description: "Unable to delete Thread 🥲",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getThreads();
    }
  }, [status]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroup>
          <div className="flex justify-between items-center">
            <div>
              <SidebarGroupContent className="text-base">
                Hi, {session?.user.username}
              </SidebarGroupContent>
            </div>
          </div>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span className="flex gap-2 items-center justify-start">
                    <CodeXml className="w-5" />
                    <span>Code</span>
                    <ArrowUpRight className="w-5" />
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <PaintbrushVertical className="w-5" />
                  <span>Open Canvas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <SidebarMenuButton>
                      <Search className="w-5" />
                      <span>Search Spaces</span>
                    </SidebarMenuButton>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl w-11/12">
                    <DialogHeader>
                      <DialogTitle>Search Spaces</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2 relative">
                        <Input
                          id="search-spaces"
                          placeholder="Search spaces..."
                          className="pl-7"
                        />
                        <Search className="absolute w-4 top-[7.5px] left-2" />
                      </div>
                    </div>
                    <DialogFooter className="justify-self-start items-center">
                      <Button disabled className="h-6 w-4 text-xs flex gap-1">
                        <span className="text-[10px]">⌘</span>
                        <span>K</span>
                      </Button>
                      <span className="text-sm">Get Space Summary</span>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </SidebarMenuItem>
              <div className="mt-4"></div>
              {allThreads?.map((thread) => (
                <SidebarMenuItem id={thread.id}>
                  <SidebarMenuButton onClick={() => {
                    router.push(`/thread/${thread.id}`)
                  }}>
                    <div className="flex justify-between w-full">
                      <div className="flex gap-2 items-center">
                        <div>
                          <MessageSquareText className="w-4" />
                        </div>
                        <div className="font-medium">{thread.name}</div>
                      </div>
                      <div className="hover:bg-[#5E5E5E]/90 transition-all duration-200 px-1 rounded">
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <EllipsisVertical className="w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuGroup>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <div className="flex gap-2 items-center">
                                      <Pencil /> Rename
                                    </div>
                                  </DropdownMenuItem>
                                </DialogTrigger>
                              </DropdownMenuGroup>
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteThread(thread.id);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <div className="flex gap-2 items-center text-red-500">
                                    <Trash /> Delete
                                  </div>
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Rename Thread</DialogTitle>
                            </DialogHeader>
                            <div>
                              <Input
                                onBlur={(e) => {
                                  e.preventDefault();
                                  setChangedName(e.target.value);
                                }}
                                placeholder="Enter new name"
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="secondary">Cancel</Button>
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  renameThread(thread.id);
                                }}
                              >
                                Rename
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Dialog>
                <DialogTrigger>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span className="flex gap-2 items-center justify-start">
                        <Settings className="w-4" />
                        <span>Settings</span>
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg max-w-md">
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                  </DialogHeader>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-base">Profile</div>
                      <div className="text-xs dark:text-[#A3A3A3] text-[#737373]">
                        Edit your profile details.
                      </div>
                    </div>
                    <div className="dark:hover:bg-[#4C4C4C] hover:bg-[#E3E3E3] h-10 w-10 justify-center items-center flex rounded-lg cursor-pointer transition-all duration-200">
                      <UserRound className="w-5" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-base">Theme</div>
                      <div className="text-xs dark:text-[#A3A3A3] text-[#737373]">
                        Edit your platform theme.
                      </div>
                    </div>
                    <div className="hover:bg-[#4C4C4C] h-10 w-10 justify-center items-center flex rounded-lg cursor-pointer transition-all duration-200">
                      <ModeToggle />
                    </div>
                  </div>
                  <div className="font-semibold">Learning Preferences</div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div className="max-w-[200px]">
                      <div className="text-base">Verbosity</div>
                      <div className="text-xs dark:text-[#A3A3A3] text-[#737373]">
                        How much information do you want Thinkr to provide?
                      </div>
                    </div>
                    <div className="w-56">
                      <div>
                        <Slider defaultValue={[2]} max={4} step={1} />
                      </div>
                      <div className="flex justify-between items-center text-xs dark:text-[#A3A3A3] text-[#737373] mt-4">
                        <span>Less info</span>
                        <span>More info</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="max-w-[200px]">
                      <div className="text-base">Style</div>
                      <div className="text-xs dark:text-[#A3A3A3] text-[#737373]">
                        How do you want Thinkr to teach you?
                      </div>
                    </div>
                    <div className="w-56">
                      <div>
                        <Slider defaultValue={[2]} max={4} step={1} />
                      </div>
                      <div className="flex justify-between items-center text-xs dark:text-[#A3A3A3] text-[#737373] mt-4">
                        <span>Bullet Points</span>
                        <span>Paragraphs</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="max-w-[200px]">
                      <div className="text-base">Other Details</div>
                      <div className="text-xs dark:text-[#A3A3A3] text-[#737373]">
                        Please provide any further details into how you want
                        Feynman to teach you.
                      </div>
                    </div>
                    <div className="w-56">
                      <Textarea placeholder="Additional Details" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="secondary">
                      <Save className="w-5" /> Save
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  signOut({ callbackUrl: "/" })
                }}>
                  <span className="flex gap-2 items-center justify-start">
                    <LogOut className="w-4" />
                    <span>Logout</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
