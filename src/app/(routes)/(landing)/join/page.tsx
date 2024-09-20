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
import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "lucide-react";

const plans = [
  {
    name: "Principiantes",
    price: "$400.000",
    description: "Perfecto para iniciar!",
    features: [
      "5 niveles",
      "Tutoria perzonalizada",
      "Clases de grupo",
      "Materiales de estudio en línea",
      "Seguimiento de progreso",
    ],
  },
  {
    name: "De A2 a B1",
    price: "$400.000",
    description: "Refuerza tus conocimientos!",
    features: [
      "5 niveles",
      "Tutoria perzonalizada",
      "Clases de grupo",
      "Materiales de estudio en línea",
      "Seguimiento de progreso",
    ],
  },
  {
    name: "De B1 a B2",
    price: "$400.000",
    description: "Converza en inglés!",
    features: [
      "5 niveles",
      "Tutoria perzonalizada",
      "Clases de grupo",
      "Materiales de estudio en línea",
      "Seguimiento de progreso",
    ],
  },
  {
    name: "Exámenes oficiales",
    price: "$400.000",
    description: "Preparate para tus exámenes!",
    features: [
      "5 niveles",
      "Tutoria perzonalizada",
      "Clases de grupo",
      "Materiales de estudio en línea",
      "Seguimiento de progreso",
    ],
  },
  {
    name: "Inglés para los negocios",
    price: "$400.000",
    description: "Aprende inglés para tu negocio!",
    features: [
      "5 niveles",
      "Tutoria perzonalizada",
      "Clases de grupo",
      "Materiales de estudio en línea",
      "Seguimiento de progreso",
    ],
  },
];

export default function JoinPage() {
  return (
    <>
      <div className="join-background relative">
        <div className="absolute h-full w-full bg-primary-700 opacity-50" />
        <div className="text- relative py-56 text-center text-4xl font-bold text-white shadow-sm drop-shadow-2xl"></div>
      </div>

      <div className="container mx-auto flex flex-col items-center gap-12 py-16">
        <h1 className="text-4xl font-bold text-primary">
          Elige tu plan de inglés
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className="flex flex-col pr-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">
                  {plan.name}
                </CardTitle>
                <CardDescription className="font-semibold">
                  {plan.price}/Mes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4 text-primary-600">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <Separator />
        <Card className="h-fit w-[500px]">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Completa el siguiente formulario para hacer parte de la academia!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Nombre</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Apellido</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electronico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Numero de telefono</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="membership-type">Tipo de programa</Label>
                <Select>
                  <SelectTrigger id="membership-type">
                    <SelectValue placeholder="Selecciona un tipo de programa" />
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
      </div>
    </>
  );
}
