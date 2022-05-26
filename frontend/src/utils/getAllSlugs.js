const getAllSlugs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`)


    const data = await res.json()

    const slugs = data.map((campaign) => campaign.slug);
    return slugs.map((slug) => {
        return {
            params: {
                slug,
            },
        };
    });
};

export default getAllSlugs;