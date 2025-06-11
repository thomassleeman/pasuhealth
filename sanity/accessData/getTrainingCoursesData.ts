import { client } from "@/sanity/lib/client";

export async function getTrainingCourse(slug: string) {
  const query = `*[_type == "trainingCourse" && slug.current == "${slug}"][0]{
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

export async function getTrainingCourses() {
  const query = `*[_type == "trainingCourse"]{
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
