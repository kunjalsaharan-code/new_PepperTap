import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Users, Plus, Copy, Check, ShoppingCart, UserPlus, Share2, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface GroupMember {
  id: string;
  name: string;
  items: number;
  amount: number;
  status: "pending" | "confirmed";
}

interface GroupOrder {
  id: string;
  name: string;
  createdBy: string;
  members: GroupMember[];
  totalItems: number;
  totalAmount: number;
  deliveryFee: number;
  status: "active" | "finalized";
}

export function GroupOrderView() {
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");
  const [groupName, setGroupName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Mock active group order
  const [activeGroup, setActiveGroup] = useState<GroupOrder | null>({
    id: "GRP123456",
    name: "Family Weekly Grocery",
    createdBy: "You",
    members: [
      { id: "1", name: "You", items: 8, amount: 450, status: "confirmed" },
      { id: "2", name: "Priya Sharma", items: 5, amount: 280, status: "confirmed" },
      { id: "3", name: "Amit Patel", items: 3, amount: 175, status: "pending" },
    ],
    totalItems: 16,
    totalAmount: 905,
    deliveryFee: 40,
    status: "active",
  });

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    const newGroup: GroupOrder = {
      id: `GRP${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      name: groupName,
      createdBy: "You",
      members: [{ id: "1", name: "You", items: 0, amount: 0, status: "confirmed" }],
      totalItems: 0,
      totalAmount: 0,
      deliveryFee: 40,
      status: "active",
    };

    setActiveGroup(newGroup);
    toast.success("Group order created!", {
      description: "Share the code with others to join",
    });
  };

  const handleJoinGroup = () => {
    if (!joinCode.trim()) {
      toast.error("Please enter a group code");
      return;
    }

    toast.success("Joined group successfully!");
  };

  const handleCopyCode = () => {
    if (activeGroup) {
      navigator.clipboard.writeText(activeGroup.id);
      setCopied(true);
      toast.success("Group code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFinalizeOrder = () => {
    toast.success("Group order finalized!", {
      description: "All members have been notified",
    });
  };

  const deliveryPerPerson = activeGroup
    ? (activeGroup.deliveryFee / activeGroup.members.length).toFixed(2)
    : "0";

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold">Group Ordering</h1>
          <p className="text-gray-600">Order together, save on delivery!</p>
        </div>
      </div>

      {/* Benefits Banner */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Save on Delivery</h3>
                <p className="text-sm text-gray-600">Split delivery cost among members</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Reduce Pressure</h3>
                <p className="text-sm text-gray-600">Fewer trips for riders</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Easy Coordination</h3>
                <p className="text-sm text-gray-600">Simple code sharing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!activeGroup ? (
        <Card>
          <CardHeader>
            <CardTitle>Start or Join a Group Order</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "create" | "join")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Create Group</TabsTrigger>
                <TabsTrigger value="join">Join Group</TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Group Name</label>
                  <Input
                    placeholder="e.g., Family Weekly Grocery"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreateGroup} className="w-full bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Group Order
                </Button>
              </TabsContent>

              <TabsContent value="join" className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter Group Code</label>
                  <Input
                    placeholder="e.g., GRP123456"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  />
                </div>
                <Button onClick={handleJoinGroup} className="w-full bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Group Order
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Group Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{activeGroup.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Created by {activeGroup.createdBy}</p>
                  </div>
                  <Badge className="bg-purple-600">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Share Code */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium mb-2">Share Group Code</label>
                  <div className="flex space-x-2">
                    <Input value={activeGroup.id} readOnly className="font-mono" />
                    <Button onClick={handleCopyCode} variant="outline">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Share this code with friends and family to add them to your group order
                  </p>
                </div>

                {/* Members List */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Members ({activeGroup.members.length})</span>
                  </h3>
                  <div className="space-y-3">
                    {activeGroup.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center font-semibold text-purple-700">
                            {member.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-gray-600">
                              {member.items} items • ₹{member.amount}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={
                            member.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {member.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add Items to Group Order
                </Button>
              </CardContent>
            </Card>

            {/* How it Works */}
            <Card>
              <CardHeader>
                <CardTitle>How Group Ordering Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm">
                  <li className="flex space-x-3">
                    <span className="font-semibold text-purple-600">1.</span>
                    <span>Create a group and share the code with friends/family</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="font-semibold text-purple-600">2.</span>
                    <span>Each member adds items to their cart independently</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="font-semibold text-purple-600">3.</span>
                    <span>All items are combined into one delivery</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="font-semibold text-purple-600">4.</span>
                    <span>Delivery fee is split equally among all members</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="font-semibold text-purple-600">5.</span>
                    <span>Each member pays only for their items + split delivery</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Group Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Items</span>
                    <span className="font-semibold">{activeGroup.totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Group Total</span>
                    <span className="font-semibold">₹{activeGroup.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">₹{activeGroup.deliveryFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Grand Total</span>
                    <span className="font-bold text-purple-600">
                      ₹{activeGroup.totalAmount + activeGroup.deliveryFee}
                    </span>
                  </div>
                </div>

                {/* Savings */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">💰 Your Savings</h4>
                  <p className="text-sm text-green-800">
                    Delivery per person: <span className="font-bold">₹{deliveryPerPerson}</span>
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    You save ₹{(40 - parseFloat(deliveryPerPerson)).toFixed(2)} on delivery!
                  </p>
                </div>

                {/* Your Share */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Your Share</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Your Items</span>
                      <span>₹450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Share</span>
                      <span>₹{deliveryPerPerson}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>You Pay</span>
                      <span className="text-purple-600">₹{(450 + parseFloat(deliveryPerPerson)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleFinalizeOrder}
                >
                  Finalize Group Order
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setActiveGroup(null)}
                >
                  Leave Group
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
