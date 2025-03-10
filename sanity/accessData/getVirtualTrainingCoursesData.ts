import { client } from "@/sanity/lib/client";

export async function getVirtualTrainingCourse(slug: string) {
  const query = `*[_type == "virtualCourse" && slug.current == "${slug}"][0]{
    title,
    slug,
    headerImage,
    forWho,
    duration,
    aims,
    outline,
    platform,
    businessTargeting,
    pricing{
      pricePerParticipant,
      groupDiscounts,
      pricingNotes
    },
    materials[]{
      title,
      description,
      fileType
    },
    testimonials[]{
      quote,
      author,
      company
    },
    seo{
      metaTitle,
      metaDescription,
      keywords
    }
  }`;
  const course = await client.fetch(query);

  return course;
}

export async function getVirtualTrainingCourses() {
  const query = `*[_type == "virtualCourse"]{
    title,
    slug,
    headerImage,
    forWho,
    duration,
    aims,
    outline,
    platform,
    businessTargeting,
    pricing{
      pricePerParticipant,
      groupDiscounts,
      pricingNotes
    },
    materials[]{
      title,
      description,
      fileType
    },
    testimonials[]{
      quote,
      author,
      company
    },
    seo{
      metaTitle,
      metaDescription,
      keywords
    }
  }`;
  const courses = await client.fetch(query);

  return courses;
}
