<?php

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

function getStudioPayload(): array
{
    return [
        'brand' => [
            'name' => 'Studio Kinetix',
            'tagline' => 'Independent studio',
            'hours' => 'Monday–Friday 10:00 – 17:00',
            'location' => 'Bucharest, Romania',
            'emails' => [
                ['label' => 'Inquiries & Commissions', 'email' => 'hello@kinetix.studio'],
                ['label' => 'Job Applications', 'email' => 'careers@kinetix.studio'],
            ],
        ],
        'projects' => [
            [
                'slug' => 'heygluco',
                'title' => 'HeyGluco',
                'category' => 'Health & Wellness',
                'discipline' => 'Brand Identity',
                'primaryImage' => '/assets/media/Vertical6.jpg',
                'hoverImage' => '/assets/media/HeyGluco_2_hover.jpg',
                'coverImage' => '/assets/media/Gluco_case_header___1_.png',
                'logo' => '/assets/media/HeyGluco.png',
                'year' => '2026',
                'context' => [
                    'HeyGluco was born from a family’s own experience with type 1 diabetes. After their daughter Ecaterina was diagnosed at seven, they found themselves navigating a new reality filled with medical information, calculations, uncertainty and a lot of fear. What they needed most in those first months wasn’t more information, but a clearer, more human way to make sense of it.',
                    'They decided to create the resource they wished they had from day one: a place where families could learn, find practical tools and feel supported by people who had already been through the same experience. Our challenge was to turn that deeply personal idea into a brand that could talk about a serious subject with clarity and empathy, without feeling clinical or intimidating.',
                ],
                'solution' => [
                    'We built HeyGluco around the idea of making diabetes easier to understand and less frightening, especially for children. At the centre of the identity is Gluco, a small dragon designed as a familiar companion through a world of sensors, insulin, glucose levels and new routines.',
                    'A warm, colourful palette moves away from the cold visual codes of healthcare, while typography and a clear editorial system make complex information easier to navigate.',
                ],
                'gallery' => [
                    '/assets/media/landscape2.jpg',
                    '/assets/media/6aad90b40048a43de8044dda_HeyGluco_1.png',
                    '/assets/media/6aad90f44758bdaf0c111ab9_HeyGluco_Vertical2.jpeg',
                    '/assets/media/6aad90d2f4bf5e08d556fef4_HeyGluco_Vertical1.jpeg',
                    '/assets/media/6aad90bbb46b87ab8d523d6e_HeyGluco_12.png',
                    '/assets/media/landscape10.jpg',
                ],
            ],
            [
                'slug' => 'bagel-bar',
                'title' => 'THE BAGEL BAR',
                'category' => 'Food & Beverage',
                'discipline' => 'Brand Identity & Packaging',
                'primaryImage' => '/assets/media/6ab27078c47da30c0af6b000_Bagel_1.jpeg',
                'hoverImage' => '/assets/media/6ab2707cc2a53666310f52d2_Bagel_2_hover.jpeg',
                'coverImage' => '/assets/media/cover_bagel.jpg',
                'logo' => '/assets/media/The_Bagel_Bar.png',
                'year' => '2025',
                'context' => [
                    'The Bagel Bar started with a simple idea: bring proper bagels to Bucharest and build a place with its own culture around them. More than a quick bite, it was meant to become a neighbourhood spot people could return to for the food, the atmosphere and everything happening around it.',
                    'The challenge was to give a relatively unfamiliar product a strong, recognizable presence while building a brand that could feel just as natural on a bagel wrapper as it did on the storefront, a T-shirt or a Friday night poster.',
                ],
                'solution' => [
                    'We built the identity around the product itself. The logomark combines the initials of Bagel Bar with the circular shape of a bagel hidden in the negative space, creating a compact symbol that can live almost anywhere.',
                    'From there, we developed a bold visual and verbal language built around oversized typography, electric blue and playful graphics, paired with photography that keeps the food and the people around it feeling real.',
                ],
                'gallery' => [
                    '/assets/media/223landscape.jpg.jpeg',
                    '/assets/media/6aaad679fdb9d914f7f520e8_6aa82802078613415d146703_BAGEL_verticale1_1.webp',
                    '/assets/media/6aaad679fdb9d914f7f520e7_6aa8280188dc35c7a49500f5_BAGEL_verticale_2.webp',
                    '/assets/media/6aaad679fdb9d914f7f520de_6aa827fd7bfae754ef3160e1_BAGEL_business_cardB_2.webp',
                    '/assets/media/6aaad679fdb9d914f7f520e0_6aa82800e1c22ef1cfa3d2f9_BAGEL_Mood7_6.webp',
                    '/assets/media/6aaad679fdb9d914f7f520e6_6aa828000b87b6696083f8f7_BAGEL_Mood8_6.webp',
                ],
            ],
            [
                'slug' => 'tanti-maria',
                'title' => 'TANTI MARIA',
                'category' => 'Food & Retail',
                'discipline' => 'Brand Design',
                'primaryImage' => '/assets/media/6ab2722877656a8e8b50e7c0_Tanti_1.jpeg',
                'hoverImage' => '/assets/media/6ab2722d77656a8e8b50e941_Tanti_2_hover.jpeg',
                'coverImage' => '/assets/media/landscape3.jpg',
                'logo' => '/assets/media/Tanti_Maria.png',
                'year' => '2026',
                'context' => [
                    'Tanti Maria is a delicatessen in Bucharest’s iconic Obor Market, built around carefully selected cured meats, cheeses and specialty products. The idea was to offer better quality without making the experience feel exclusive or out of place in a market known for its energy, familiarity and tradition.',
                    'The challenge was to create a contemporary brand that still felt like it belonged in Obor, drawing on the nostalgia and familiarity behind the name Tanti Maria.',
                ],
                'solution' => [
                    'We brought Tanti Maria to life as the face of the brand, inspired by that familiar aunt we somehow all know: warm, welcoming and always associated with good food. The illustrated character became the centre of an identity designed to feel instantly recognizable and personal.',
                    'Bold, retro-inspired typography and a vibrant graphic system bring that nostalgia into the present without making the brand feel old-fashioned.',
                ],
                'gallery' => [
                    '/assets/media/6aa82ad558a311ce1cfb19fb_TANTI_MARIA_Screenshot_2026-07-09_at_16.47.17_2.webp',
                    '/assets/media/6aa82ad40b87b66960855d2c_TANTI_MARIA_landscape2_25.webp',
                    '/assets/media/6aa82b20dcebb1672ba9c36f_TANTI_MARIA_verticale1_16.webp',
                    '/assets/media/6aa82ad52d0510a9927a7065_TANTI_MARIA_main_photo_7.webp',
                    '/assets/media/6ab2cb7e684967423e5d8091_TANTI_MARIA_vertical3.jpeg',
                    '/assets/media/6aa82ad70b87b66960855e9a_TANTI_MARIA_Screenshot_2026-07-09_at_16.47.17_3.webp',
                ],
            ],
            [
                'slug' => 'munchies-and-cream',
                'title' => 'MUNCHIES AND CREAM',
                'category' => 'Food & Beverage',
                'discipline' => 'Brand Identity & Illustration',
                'primaryImage' => '/assets/media/6ab2721e4694c5c1d617273d_Munchies_1.jpeg',
                'hoverImage' => '/assets/media/6ab27223e0afaf640fd855d7_Munchies_2_hover.jpeg',
                'coverImage' => '/assets/media/6aa82aaaa15647f991aded71_MUNCHIES_AND_CREAM_landscape2_28.avif',
                'logo' => '/assets/media/Munchies___Cream.png',
                'year' => '2025',
                'context' => [
                    'Munchies & Cream was created as an ice cream brand for people looking for something a little less predictable. With bold flavours, limited drops and a strong connection to food culture, the ambition was to build something people could follow, collect and talk about, not just pick from a freezer.',
                    'The challenge was to give the brand a recognizable personality from day one, while leaving enough room for it to constantly change with new flavours, products and ideas.',
                ],
                'solution' => [
                    'We took the name literally and turned Munchies and Cream into two characters at the heart of the brand. Rather than keeping them fixed, we created a modular illustration system that lets their expressions and personalities change depending on the flavour, campaign or message.',
                    'Paired with bold typography and a vibrant colour palette, the characters became the foundation for a visual world that can keep evolving without losing its identity.',
                ],
                'gallery' => [
                    '/assets/media/6aa82aab5383a79f39dcfa03_MUNCHIES_AND_CREAM_landscape2_32.webp',
                    '/assets/media/6aa82acfee13e7c3c6de8363_MUNCHIES_AND_CREAM_verticale1_22__1_.webp',
                    '/assets/media/6aa82aab06b331ea44e1b6c7_MUNCHIES_AND_CREAM_main_photo_8.webp',
                    '/assets/media/6aa82aaca299e1bbdf2551fc_MUNCHIES_AND_CREAM_Rectangle_54.webp',
                    '/assets/media/6aa82acdd3271d7140ca9b69_MUNCHIES_AND_CREAM_Rectangle_56.webp',
                    '/assets/media/6aa82aaa5383a79f39dcf9d9_MUNCHIES_AND_CREAM_landscape2_29.webp',
                ],
            ],
            [
                'slug' => 'mvp',
                'title' => 'MVP',
                'category' => 'Sports & Talent Management',
                'discipline' => 'Brand Identity & Web Design',
                'primaryImage' => '/assets/media/6ab270907f6e9d96146209a1_MVP_Thumbnail1.jpeg',
                'hoverImage' => '/assets/media/6ab27093a089e1fd370a7310_MVP_Thumbnail2_hover.jpeg',
                'coverImage' => '/assets/media/HeaderCover_MVP.jpg.jpeg',
                'logo' => '/assets/media/MVP.png',
                'year' => '2025',
                'context' => [
                    'MVP Agency was created to connect top sports talent with brands through long-term partnerships, campaigns and sponsorships. The ambition goes beyond traditional athlete representation, positioning its talent as ambassadors, creators and personalities with a presence beyond competition.',
                    'The challenge was to build a brand that could carry the energy and confidence of sport without looking like a traditional sports identity, while giving a growing and diverse roster of talent the space to stand out.',
                ],
                'solution' => [
                    'We created a bold and direct visual identity that takes cues from the energy of sport without relying on its usual visual clichés. Strong typography, sharp contrasts and a flexible graphic system give MVP a recognizable voice while keeping the athletes and their stories at the centre.',
                    'We carried the same system into the website, creating a platform where athletes, projects and content can constantly change while the brand stays unmistakably MVP.',
                ],
                'gallery' => [
                    '/assets/media/6aa82a6588dc35c7a49625d1_MP_AGENCY_landscape2_11.webp',
                    '/assets/media/6aa82aaa26e7cca7f149267b_MP_AGENCY_verticale1_4.webp',
                    '/assets/media/6aa82aa729a2124c0671b6b0_MP_AGENCY_main_photo_5.webp',
                    '/assets/media/6aa82aa6ee13e7c3c6de7324_MP_AGENCY_landscape2_8.webp',
                    '/assets/media/6aa82a66078613415d15b5b1_MP_AGENCY_landscape2_22.webp',
                    '/assets/media/6aa82a65d3271d7140ca6acb_MP_AGENCY_landscape2_14.webp',
                ],
            ],
            [
                'slug' => 'yum-yum',
                'title' => 'YUM YUM',
                'category' => 'Food & Beverage',
                'discipline' => 'Brand Design',
                'primaryImage' => '/assets/media/6ab272335c44422412d81fb1_YumYum_1.jpeg',
                'hoverImage' => '/assets/media/6ab2723985afb9378f444d8b_YumYum_2_hover.jpeg',
                'coverImage' => '/assets/media/1s.jpg',
                'logo' => '/assets/media/YumYum.png',
                'year' => '2026',
                'context' => [
                    'YumYum grew from the founders’ childhood memories of homemade juices, made with fruit picked straight from their family gardens. Years later, they wanted to bring that same simplicity and honest approach to a new generation of natural juices.',
                    'Our challenge was to translate those roots into a contemporary brand, one that could feel natural and approachable without looking rustic or predictable.',
                ],
                'solution' => [
                    'One detail gave us the starting point for the entire identity: every YumYum recipe uses grape juice as its base, no matter the flavour. We turned that constant into the brand’s most recognizable element, creating a Y-shaped mark that also reads as a simplified grape.',
                    'A restrained visual system, distinctive typography and a refined colour palette give YumYum a contemporary feel while keeping the ingredients and product at the centre.',
                ],
                'gallery' => [
                    '/assets/media/6aa82c2dd6419c727e60cb1b_YUM_YUM_cover_1.webp',
                    '/assets/media/6aa82c2d0b87b6696085ff38_YUM_YUM_cutie_1.webp',
                    '/assets/media/6aa82c32b1f8270700e90c7c_YUM_YUM_totebag_4.webp',
                    '/assets/media/6aa82c2f8d2f08f02346f578_YUM_YUM_businesscard_2.webp',
                    '/assets/media/6aa82b21a299e1bbdf25955e_YUM_YUM_billboard_v2_1.webp',
                    '/assets/media/6aa82c2c2d0510a9927b29b4_YUM_YUM_camion_2.webp',
                ],
            ],
            [
                'slug' => 'lp-one',
                'title' => 'LP ONE',
                'category' => 'Automotive & Mobility',
                'discipline' => 'Brand Identity',
                'primaryImage' => '/assets/media/6ab2708033519ae53cb4504d_lp1_Thumbnail1.jpeg',
                'hoverImage' => '/assets/media/6ab27084a6716c1b6c77a89d_lp1_Thumbnail2_hover.jpeg',
                'coverImage' => '/assets/media/LP1_header.jpg.jpeg',
                'logo' => '/assets/media/LP1.png',
                'year' => '2025',
                'context' => [
                    'LP One brings precision and modern mobility together into a unified automotive experience.',
                    'Our goal was to craft a sharp, technical visual system that stands apart from legacy automotive branding.',
                ],
                'solution' => [
                    'We engineered a modular geometric wordmark and high-contrast editorial grid designed for digital dashboards, signage, and print.',
                ],
                'gallery' => [
                    '/assets/media/LP1_header.jpg.jpeg',
                    '/assets/media/6ab2708033519ae53cb4504d_lp1_Thumbnail1.jpeg',
                    '/assets/media/6ab27084a6716c1b6c77a89d_lp1_Thumbnail2_hover.jpeg',
                ],
            ],
            [
                'slug' => 'merci',
                'title' => 'MERCI',
                'category' => 'Hospitality & Lifestyle',
                'discipline' => 'Brand Identity',
                'primaryImage' => '/assets/media/6ab27087a6716c1b6c77a96a_merci_Thumbnail1.jpeg',
                'hoverImage' => '/assets/media/Header_Merci.jpg.jpeg',
                'coverImage' => '/assets/media/Header_Merci.jpg.jpeg',
                'logo' => '/assets/media/Merci.png',
                'year' => '2025',
                'context' => [
                    'Merci needed a warm, tactile brand identity that felt personal from the very first touchpoint.',
                ],
                'solution' => [
                    'We paired expressive typography with custom packaging and a welcoming visual language.',
                ],
                'gallery' => [
                    '/assets/media/Header_Merci.jpg.jpeg',
                    '/assets/media/6ab27087a6716c1b6c77a96a_merci_Thumbnail1.jpeg',
                ],
            ],
        ],
        'about' => [
            'headline' => 'Small studio, big brand energy',
            'intro' => 'Founded in Bucharest, Studio Kinetix brings together years of experience across advertising, branding and digital.',
            'storyTitle' => 'Two ’90s kids, one shared itch to make better brands.',
            'story' => [
                'After years working for others, we changed course in early 2024 and decided to put all that experience into a dream of our own. What started with some recommendations and a few familiar faces quickly grew into something of its own. A studio where we could question the brief, really look into the details and make the kind of work that makes us smile.',
                'We have grown, but not into a maze of departments. Instead, Studio Kinetix is a three-person core team, supported by top notch collaborators whenever a project demands it. It means we can stay involved, move quickly and build the right team around each situation. We do not chase work for the sake of filling a portfolio. We like projects with a real challenge and people who care about getting it right.',
            ],
            'team' => [
                ['name' => 'Alex', 'role' => 'Co-Founder & Creative Director', 'photo' => '/assets/media/Bogdan.avif'],
                ['name' => 'Elena', 'role' => 'Co-Founder & Brand Strategist', 'photo' => '/assets/media/Diana.avif'],
                ['name' => 'Andreea', 'role' => 'Senior Designer', 'photo' => '/assets/media/Andreea_2_copy.avif'],
            ],
            'illustrations' => [
                'hero' => '/assets/media/about-hero.svg',
                'studio' => '/assets/media/illustration_5.svg',
                'chair' => '/assets/media/chair.svg',
                'workCat' => '/assets/media/cat-work.svg',
            ],
        ],
        'showcase' => [
            ['type' => 'video', 'mp4' => '/assets/media/Shot_1_mp4.mp4', 'webm' => '/assets/media/Shot_1_webm.webm'],
            ['type' => 'image', 'src' => '/assets/media/Shot_2.jpg'],
            ['type' => 'video', 'mp4' => '/assets/media/Shot_3_mp4.mp4', 'webm' => '/assets/media/Shot_3_webm.webm'],
            ['type' => 'image', 'src' => '/assets/media/Shot_4.jpg'],
            ['type' => 'image', 'src' => '/assets/media/Shot_5.jpg'],
            ['type' => 'image', 'src' => '/assets/media/Shot_6.png'],
        ],
        'services' => [
            ['title' => 'Brand Strategy', 'desc' => 'We find the idea, the angle and the reasons people should care.'],
            ['title' => 'Brand Identity', 'desc' => 'We give your brand a distinctive look, feel and personality that feel unmistakably yours.'],
            ['title' => 'Web Design', 'desc' => 'We turn your brand into a digital experience that looks great, feels right and is easy to navigate.'],
            ['title' => 'Illustration', 'desc' => 'We create distinctive illustrations that add character to your brand.'],
            ['title' => 'Motion Design', 'desc' => 'We make your brand move, cause standing still just isn’t enough.'],
            ['title' => 'Packaging Design', 'desc' => 'We create packaging that catches the eye and works better for your brand.'],
            ['title' => 'Art Direction', 'desc' => 'We keep all the moving parts moving in the same direction, from the big idea down to the smallest detail.'],
        ],
        'testimonials' => [
            [
                'headline' => "Working with the Kinetix team has been one of the smoothest collaborations I've had",
                'name' => 'Ruxandra Florescu',
                'role' => 'COO, Dare Digital',
                'avatar' => '/assets/media/Rux.jpg',
                'quote' => "They're sharp, always responsive, and have a real talent for turning briefs into compelling visuals. No matter the challenge: tight deadlines, shifting requirements, tricky creative constraints, they always show up with solutions. Highly recommend working with them!",
            ],
            [
                'headline' => 'Studio Kinetix truly brought HeyGluco to life',
                'name' => 'Luiza Zamfirescu',
                'role' => 'Co-Founder, HeyGluco',
                'avatar' => '/assets/media/luiza.jpg',
                'quote' => 'Both of them are truly amazing humans, with an incredible amount of creativity and talent. They took our vision, understood it completely, and brought it to life in ways that went beyond anything we could have imagined.',
            ],
            [
                'headline' => 'Working with Studio Kinetix is a bit like brainstorming ideas with your best friends',
                'name' => 'Vlad Belcin',
                'role' => 'Sr. Copywriter, Dare Digital',
                'avatar' => '/assets/media/Vlad.jpg',
                'quote' => "Always fun, always insightful, always constructive. It hardly feels like working, cause the whole process is always so smooth. That's what you get for getting the job done with cool creatives, I guess.",
            ],
            [
                'headline' => 'Four projects and counting',
                'name' => 'Ionut Belet',
                'role' => 'Founder, MVP Agency',
                'avatar' => '/assets/media/Ionut.jpg',
                'quote' => "We’ve worked together on two websites and two visual identities so far, and it’s been a pleasure every time. Great ideas, really well executed, and just lovely people to work with.",
            ],
            [
                'headline' => 'Better than we imagined',
                'name' => 'Monica Tantu',
                'role' => 'Co-Founder, Merci',
                'avatar' => '/assets/media/Monica.jpg',
                'quote' => "Working with Studio Kinetix on our brand identity was a great experience from start to finish. They’re incredibly creative and thoughtful, and genuinely invested in getting things right.",
            ],
        ],
        'faqs' => [
            ['q' => 'What kind of projects do you take on?', 'a' => 'Branding is our main thing, from strategy and identity to packaging, illustration, motion and web design. We like projects where there’s room to think, question things and build something with a bit of character.'],
            ['q' => 'How much does a branding project cost?', 'a' => 'It depends on what we’re making. Every project is a little different, so we price based on scope rather than pulling a mysterious number out of a hat. Tell us what you have in mind and we’ll take it from there.'],
            ['q' => 'Can you work with a brand that already exists?', 'a' => 'Of course. Not everything needs to be burned to the ground and rebuilt. Sometimes a brand just needs a fresh pair of eyes and a few very intentional changes.'],
            ['q' => 'Do you work with clients outside Romania?', 'a' => 'Absolutely. We’re based in Bucharest, but our Wi-Fi travels remarkably well. We’re happy to work with people pretty much anywhere.'],
            ['q' => 'What if we don’t like the first concepts?', 'a' => 'We talk about why. Feedback is part of the process, and nothing is presented just because “we thought it looked cool.” Although we do like when things look cool.'],
            ['q' => 'How involved do we need to be?', 'a' => 'Involved enough. We’ll need your knowledge, feedback and decisions along the way. Don’t worry, we won’t make you sit next to us while we move things two pixels to the left.'],
            ['q' => 'Can you start yesterday?', 'a' => 'We checked. Unfortunately, yesterday is fully booked. But send us a message and we’ll tell you when we can realistically get started.'],
            ['q' => 'Do you work with small businesses?', 'a' => 'Yep. Company size matters less to us than the project, the people behind it and what we can actually do together.'],
            ['q' => 'Do you also develop websites?', 'a' => 'We design them. For development, we work with people we trust and can bring them into the project when needed. So yes, your website can actually become a website.'],
            ['q' => 'What’s with all the cats?', 'a' => 'Those are Oreo and Oliver. They’re not technically employed by the studio, but they’ve somehow made it into the brand anyway. They mostly sleep through meetings and contribute very little creatively.'],
        ],
    ];
}

Route::get('/', fn () => view('welcome', ['studioData' => getStudioPayload(), 'page' => 'home', 'slug' => null]));
Route::get('/work', fn () => view('welcome', ['studioData' => getStudioPayload(), 'page' => 'work', 'slug' => null]));
Route::get('/about', fn () => view('welcome', ['studioData' => getStudioPayload(), 'page' => 'about', 'slug' => null]));
Route::get('/work/{slug}', function (string $slug) {
    $data = getStudioPayload();
    $found = collect($data['projects'])->firstWhere('slug', $slug);
    abort_if(!$found, 404);
    return view('welcome', ['studioData' => $data, 'page' => 'case-study', 'slug' => $slug]);
});

Route::post('/api/contact', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:120',
        'email' => 'required|email|max:160',
        'message' => 'required|string|max:2000',
    ]);

    $saved = ContactMessage::create($validated);

    return response()->json([
        'status' => 'ok',
        'message' => 'Message received. Our team will reply shortly.',
        'id' => $saved->id,
    ], 201);
});
