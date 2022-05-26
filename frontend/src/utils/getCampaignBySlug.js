const getCampaignBySlug = async (slug) => {
    const res =
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${slug}`)
    const data = await res.json()

    return data;
};

export default getCampaignBySlug;