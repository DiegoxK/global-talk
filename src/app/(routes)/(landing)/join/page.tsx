import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, StarIcon, ZapIcon } from "lucide-react";

export default function JoinPage() {
  return (
    <>
      <div className="bg-primary py-44">
        <h1 className="text-center text-4xl font-bold text-white">
          Únete a Global Talk Medallo
        </h1>
      </div>
      <div className="container mx-auto px-12 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Please fill out the form below to join.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membership-type">Membership type</Label>
                  <Select>
                    <SelectTrigger id="membership-type">
                      <SelectValue placeholder="Select a membership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Join Now
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="mb-4 text-2xl font-semibold">Our Services</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  Basic Membership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Access to basic features and community support.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <StarIcon className="mr-2 h-5 w-5 text-yellow-500" />
                  Pro Membership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Advanced features, priority support, and exclusive content.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ZapIcon className="mr-2 h-5 w-5 text-purple-500" />
                  Enterprise Membership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Custom solutions, dedicated account manager, and full API
                  access.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
