import clsx from "clsx";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { pricingCards } from "@/lib/constants";
import Link from "next/link";

interface IProps {
    card: typeof pricingCards[0];
}
const PricingCard = ({ card }: IProps) => {
    return (
        <Card key={card.title}
            className={
                clsx('w-[300px] flex flex-col justify-between', { "border-2 border-primary": card.title === 'Unlimited Saas' })
            }>
            <CardHeader>
                <CardTitle className={clsx('', { 'text-muted-foreground': card.title !== 'Unlimited Saas' })}>
                    {card.title}
                </CardTitle>
                <CardDescription>
                    {card.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <span className="text-4xl font-bold">
                    {card.price}
                </span>
                <span className="text-muted-foreground">
                    /m
                </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
                <div>
                    {card.features.map(feature => (
                        <div key={feature} className="flex gap-2 items-center">
                            <Check className="text-muted-foreground" />
                            <p>{feature}</p>
                        </div>
                    ))}
                </div>
                <Link
                    href={`/agency?plan=${card.priceId}`}
                    className={clsx('w-full text-center bg-primary p-2 rounded-md', { '!bg-muted-foreground': card.title !== 'Unlimited Saas' })}>
                    Get Started
                </Link>
            </CardFooter>
        </Card>
    )
}
export default PricingCard;