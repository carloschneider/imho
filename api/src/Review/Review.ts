<<<<<<< HEAD:api/src/Review/Review.ts
import { ObjectType, Field, Float } from 'type-graphql';
=======
import { ObjectType, Field, Float, Ctx, Root } from 'type-graphql';
import { Residence } from '../Residence/Residence';
>>>>>>> cards:api/src/Review/reviews.ts
import { LaundryType, StoveType } from '../types/enum_types';
import { DateRange } from '../types/object_types';

@ObjectType()
export class Review {
    @Field()
    res_id: number;

    @Field()
    user_id: number;

    @Field()
    rating?: number;

    @Field({ nullable: true })
    rent?: number;

<<<<<<< HEAD:api/src/Review/Review.ts
=======
    @Field(() => Residence, { nullable: true })
    async myResidence(
        @Root() review: Review,
        @Ctx() { dataSources }: MyContext
    ): Promise<Residence | undefined> {
        const res = await dataSources.pgHandler.getResidencesById([
            review.res_id,
        ]);
        if (res.errors === undefined && res.residences !== undefined) {
            return res.residences[0];
        }
        return;
    }

>>>>>>> cards:api/src/Review/reviews.ts
    // new bools
    @Field({ nullable: true })
    air_conditioning?: boolean;

    @Field({ nullable: true })
    heat?: boolean;

    @Field(() => StoveType, { nullable: true })
    stove?: StoveType;

    @Field({ nullable: true })
    pool?: boolean;

    @Field({ nullable: true })
    gym?: boolean;

    @Field({ nullable: true })
    garbage_disposal?: boolean;

    @Field({ nullable: true })
    dishwasher?: boolean;

    @Field({ nullable: true })
    parking?: boolean;

    @Field({ nullable: true })
    doorman?: boolean;

    @Field({ nullable: true })
    pet_friendly?: boolean;

    @Field(() => LaundryType, { nullable: true })
    laundry?: LaundryType;

    @Field({ nullable: true })
    backyard?: boolean;

    @Field(() => Float, { nullable: true })
    bath_count?: number;

    @Field({ nullable: true })
    bedroom_count?: number;

    @Field(() => DateRange, { nullable: true })
    lease_term?: DateRange;

    @Field(() => String)
    created_at = new Date();

    @Field(() => String)
    updated_at = new Date();
}
