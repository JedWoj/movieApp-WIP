import React from 'react';
import { Container } from '@chakra-ui/react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import { getFormattedPromise } from '../../lib/getFormattedPromise';
import { SinglePersonDetailsType } from '../../types/personDetailsType';
import { PersonRolesType } from '../../types/personRolesType';
import SinglePersonDetail from '../../components/SinglePerson/SinglePersonDetails';
import SinglePersonCredits from '../../components/SinglePerson/SinglePersonCredits';

interface SinglePersonPageType {
    personDetails: SinglePersonDetailsType,
    credits: PersonRolesType,
}

const SinglePersonPage = (props: SinglePersonPageType) => {
    const { credits,personDetails } = props;

    return(
        <Container marginTop={'5'} maxW={'5xl'} centerContent>
            <SinglePersonDetail details={personDetails} />
            {credits.cast.length > 0 && <SinglePersonCredits type={'Casting in:'} persons={credits.cast.slice(0,6)} />}
            {credits.crew.length > 0 && <SinglePersonCredits type={'Part of the crew in:'} persons={credits.crew.slice(0,6)} />}
        </Container>
    )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const slug = context.params?.slug;
    const [personDetails, credits] = await Promise.all([
        getFormattedPromise(`https://api.themoviedb.org/3/person/${slug}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}&language=en-US`),
        getFormattedPromise(`https://api.themoviedb.org/3/person/${slug}/movie_credits?api_key=${process.env.NEXT_PUBLIC_MOVIE_API}&language=en-US`),
    ]);
    return {
        props: {personDetails, credits},
        revalidate: 180
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{params: {slug: '2'}}],
        fallback: 'blocking'
    }
} 

export default SinglePersonPage;