import 'dotenv/config';
import mongoose from 'mongoose';
import MovieModel from '../models/MovieModel.js'; // keep correct relative path

const uri = process.env.MongoDb_URI;

if (!uri) {
  console.error('❌ MONGODB_URI missing in .env');
  process.exit(1);
}

const seedMovies = [
  
  {
    title: "The Secret Life of Walter Mitty",
    mood: "happy",
    overview: "Walter embarks on an extraordinary adventure to find the missing photo negative that could save his job.",
    poster: "https://i0.wp.com/halcyonrealms.com/blogpics/wmitty01.jpg?resize=750%2C500&ssl=1",
    trailerUrl: "https://www.youtube.com/watch?v=QD6cy4PBQPI",
    genres: ["Adventure", "Comedy", "Drama"],
    releaseDate: "2013-12-25",
    language: "English"
  },
  {
    title: "3 Idiots",
    mood: "happy",
    overview: "Three friends’ college journey full of humor, friendship, and life lessons.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROzySmzEQzKx8UJk7ovzRA8N65Ca5I3rqEww&s",
    trailerUrl: "https://www.youtube.com/watch?v=xvszmNXdM4w",
    genres: ["Comedy", "Drama"],
    releaseDate: "2009-12-25",
    language: "Hindi"
  },
  {
    title: "Oh My Kadavule",
    mood: "happy",
    overview: "A young man gets a second chance at life and love with a magical twist.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQTQAX31a00mZWkcEFtZrNTtfWXneeyIBEUw&s",
    trailerUrl: "https://www.youtube.com/watch?v=R3WbLQd2a6A",
    genres: ["Romance", "Fantasy", "Comedy"],
    releaseDate: "2020-02-14",
    language: "Tamil"
  },
  {
    title: "Forrest Gump",
    mood: "happy",
    overview: "A simple man’s extraordinary life through decades of love, loss, and triumph.",
    poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=bLvqoHBptjg",
    genres: ["Comedy", "Drama"],
    releaseDate: "1994-07-06",
    language: "English"
  },
  {
    title: "Zootopia",
    mood: "happy",
    overview: "In a city of anthropomorphic animals, a bunny cop and a cynical fox uncover a conspiracy together.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_hUISFeZjdDXG17p8IaD2K_4Z76h5iLflDQ&s",
    trailerUrl: "https://www.youtube.com/watch?v=jWM0ct-OLsM",
    genres: ["Animation", "Comedy", "Family"],
    releaseDate: "2016-03-04",
    language: "English"
  },
  {
    title: "Coco",
    mood: "happy",
    overview: "Aspiring musician Miguel crosses into the Land of the Dead to find his great-great-grandfather and understand his family history.",
    poster: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=Ga6RYejo6Hk",
    genres: ["Animation", "Family", "Fantasy"],
    releaseDate: "2017-11-22",
    language: "English"
  },
  {
    title: "Paddington 2",
    mood: "happy",
    overview: "Paddington picks up odd jobs to buy a present for Aunt Lucy, leading to heartwarming adventures.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-wR5ZVgJOn31cLUoQ192jtW6NJVhz3Kp9fQ&s",
    trailerUrl: "https://www.youtube.com/watch?v=52x5HJ9H8DM",
    genres: ["Comedy", "Family"],
    releaseDate: "2017-11-10",
    language: "English"
  },
  {
    title: "La La Land",
    mood: "happy",
    overview: "A pianist and an actress fall in love while attempting to reconcile their artistic aspirations in LA.",
    poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    genres: ["Comedy", "Drama", "Romance"],
    releaseDate: "2016-12-09",
    language: "English"
  },
  {
    title: "Amélie",
    mood: "happy",
    overview: "A whimsical Parisian girl's schemes to help others lead her to surprising self-discovery.",
    poster: "https://image.tmdb.org/t/p/w500/wnUAcUrMRGPPZUDroLeZhSjLkuu.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=HUECWi5pX7o",
    genres: ["Romance", "Comedy"],
    releaseDate: "2001-04-25",
    language: "French"
  },
  {
    title: "The Intouchables",
    mood: "happy",
    overview: "A wealthy quadriplegic forms an unlikely friendship with his caregiver from the projects.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHqoDkL964DG2fQxFpo4JtufeDY-zjXUsivA&s",
    trailerUrl: "https://www.youtube.com/watch?v=34WIbmXkewU",
    genres: ["Drama", "Comedy"],
    releaseDate: "2011-11-02",
    language: "French"
  },
  {
    title: "Singin' in the Rain",
    mood: "happy",
    overview: "A silent film production and cast struggle to transition to sound, with musical hilarity.",
    poster: "https://images.squarespace-cdn.com/content/v1/58e925b6f5e231a18a473080/2d8beb06-e20f-456f-9edb-9c667a1adf9a/singin-in-the-rain-film-poster-man-on-lamp-post-singing-in-rain.JPG",
    trailerUrl: "https://www.youtube.com/watch?v=D1ZYhVpdXbQ",
    genres: ["Comedy", "Musical", "Romance"],
    releaseDate: "1952-04-10",
    language: "English"
  },
  {
    title: "Toy Story",
    mood: "happy",
    overview: "A cowboy doll faces jealousy when a new spaceman toy becomes the favorite.",
    poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=KYz2wyBy3kc",
    genres: ["Animation", "Comedy", "Family"],
    releaseDate: "1995-11-22",
    language: "English"
  },
  {
    title: "The Lego Movie",
    mood: "happy",
    overview: "An ordinary Lego worker is mistaken for the prophesied 'Special' and joins a quest to stop a tyrant.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8vbopiN6W12I1gQECcNif7i0BTe_BA8o2fw&s",
    trailerUrl: "https://www.youtube.com/watch?v=fZ_JOBCLF-I",
    genres: ["Animation", "Action", "Comedy"],
    releaseDate: "2014-02-07",
    language: "English"
  },
  {
    title: "Up",
    mood: "happy",
    overview: "Elder Carl ties thousands of balloons to his house to fly to South America and fulfill a promise.",
    poster: "https://image.tmdb.org/t/p/w500/vpbaStTMt8qqXaEgnOR2EE4DNJk.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=ORFWdXl_zJ4",
    genres: ["Animation", "Adventure", "Comedy"],
    releaseDate: "2009-05-29",
    language: "English"
  },
  {
    title: "Ratatouille",
    mood: "happy",
    overview: "A rat with a refined palate teams up with a young kitchen worker to make great cuisine in Paris.",
    poster: "https://image.tmdb.org/t/p/w500/npHNjldbeTHdKKw28bJKs7lzqzj.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=c3sBBRxDAqk",
    genres: ["Animation", "Comedy", "Family"],
    releaseDate: "2007-06-29",
    language: "English"
  },
  {
    title: "Sing",
    mood: "happy",
    overview: "A theater-owning koala hosts a singing contest to save his struggling theater.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy4s6IpmUsACHGIKazO2KRjUPQfLJiaUK8uw&s",
    trailerUrl: "https://www.youtube.com/watch?v=9qPgK_u4vX8",
    genres: ["Animation", "Comedy", "Family"],
    releaseDate: "2016-12-21",
    language: "English"
  },
  {
    title: "Moana",
    mood: "happy",
    overview: "A strong-willed girl sails across the ocean to save her island and find her true calling.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2FesM70_wkx6k7Q159PFBzWzxOX5z2G8F3w&s",
    trailerUrl: "https://www.youtube.com/watch?v=LKFuXETZUsI",
    genres: ["Animation", "Adventure", "Family"],
    releaseDate: "2016-11-23",
    language: "English"
  },
  {
    title: "Bajrangi Bhaijaan",
    mood: "happy",
    overview: "A man helps a lost mute girl return to her home in Pakistan, forging human bonds across borders.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAGSv6Q-0c3KqY66sIb3v40fKPj6kfYHC3pg&s",
    trailerUrl: "https://www.youtube.com/watch?v=YkDhw81A248",
    genres: ["Adventure", "Drama", "Family"],
    releaseDate: "2015-07-17",
    language: "Hindi"
  },
  {
    title: "Barfi!",
    mood: "happy",
    overview: "A touching and quirky story about a deaf-mute man and the people he loves.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCbmbHUwWV7Vj37pm7-QHbRHBYtrQvtaBa3Q&s",
    trailerUrl: "https://www.youtube.com/watch?v=SlDKBh8l4Nw",
    genres: ["Comedy", "Romance", "Drama"],
    releaseDate: "2012-09-14",
    language: "Hindi"
  },
  {
    title: "Paddington",
    mood: "happy",
    overview: "A polite bear from Peru searches for a new home in London and encounters family adventure.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-AGpoQVbHGkz68VLmwI9S6NiBMEd78autjg&s",
    trailerUrl: "https://www.youtube.com/watch?v=ZcMz3D1aZ5s",
    genres: ["Family", "Comedy"],
    releaseDate: "2014-11-28",
    language: "English"
  },
  {
    title: "Sing Street",
    mood: "happy",
    overview: "A teen starts a band in 1980s Dublin to impress a girl and escapes life through music.",
    poster: "https://i.pinimg.com/474x/97/a6/d4/97a6d457914370f6cb7d16f94db4a256.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=Ai2WJf6dA2Q",
    genres: ["Music", "Drama", "Comedy"],
    releaseDate: "2016-04-15",
    language: "English"
  },
  {
    title: "Little Miss Sunshine",
    mood: "happy",
    overview: "A dysfunctional family travel cross-country for a child's beauty pageant, leading to comic and touching moments.",
    poster: "https://wallpapercat.com/w/full/a/e/c/319188-2000x3000-samsung-hd-little-miss-sunshine-wallpaper-photo.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=EIlNrJ3mG2U",
    genres: ["Comedy", "Drama"],
    releaseDate: "2006-07-26",
    language: "English"
  },
  {
    title: "Jab We Met",
    mood: "happy",
    overview: "A bubbly woman changes the course of a grumpy stranger's life during a train journey.",
    poster: "https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/50386827.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=YqeW9_5kURI",
    genres: ["Romance", "Comedy", "Drama"],
    releaseDate: "2007-10-26",
    language: "Hindi"
  },
  {
    title: "Queen",
    mood: "happy",
    overview: "After being left at the altar, a young woman travels alone and rediscovers herself on an international trip.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_-6lTFpvjQU7jumgwvVA35bTqX1fHJ1nV2g&s",
    trailerUrl: "https://www.youtube.com/watch?v=Vvc9Yq5vJOY",
    genres: ["Comedy", "Drama"],
    releaseDate: "2014-03-07",
    language: "Hindi"
  },
  {
    title: "Chef",
    mood: "happy",
    overview: "A chef starts a food truck to reconnect with his creativity and family.",
    poster: "https://images5.alphacoders.com/112/1121025.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=MmC9b0lLimM",
    genres: ["Comedy", "Drama"],
    releaseDate: "2014-05-09",
    language: "English"
  },
  {
    title: "Kung Fu Panda",
    mood: "happy",
    overview: "A clumsy panda becomes the Dragon Warrior and learns his true potential.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEwe5pEDRHhQonMCyetUsTEmGz4Q5IfLoIFQ&s",
    trailerUrl: "https://www.youtube.com/watch?v=PXi3Mv6KMzY",
    genres: ["Animation", "Action", "Comedy"],
    releaseDate: "2008-06-06",
    language: "English"
  },
  {
    title: "The Grand Budapest Hotel",
    mood: "happy",
    overview: "The adventures of a legendary concierge and his lobby boy at a famous European hotel.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFWyHZ1osigu1WjE5u7IhG3q-8GfaWmEurZg&s",
    trailerUrl: "https://www.youtube.com/watch?v=1Fg5iWmQjwk",
    genres: ["Comedy", "Drama"],
    releaseDate: "2014-03-28",
    language: "English"
  },
   {
    title: "Zindagi Na Milegi Dobara",
    mood: "happy",
    overview: "Three friends take a road trip across Spain, rediscovering life, friendship, and love.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfLXoaxT3vCe_yPLe61G_Ex7jcGJOflrEapQ&s",
    trailerUrl: "https://www.youtube.com/watch?v=FJrpcDgC3zU",
    genres: ["Adventure", "Drama", "Comedy"],
    releaseDate: "2011-07-15"
  },
  {
    title: "Yeh Jawaani Hai Deewani",
    mood: "happy",
    overview: "A story of friendship, love, and chasing dreams through the lens of four young friends.",
    poster: "https://i.pinimg.com/736x/34/5f/ec/345fecf5e269212d9a287508648ec173.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=Rbp2XUSeUNE",
    genres: ["Romance", "Comedy", "Drama"],
    releaseDate: "2013-05-31"
  },
   {
    title: "Anand",
    mood: "happy",
    overview: "A terminally ill man teaches everyone around him the joy of living.",
    poster: "https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/1700/1371700-i-0e01b6be74ed",
    trailerUrl: "https://www.youtube.com/watch?v=_uhwN8SpkX0",
    genres: ["Drama"],
    releaseDate: "1971-03-12"
  },



  {
    title: "The Pursuit of Happyness",
    mood: "sad",
    overview: "A struggling salesman fights against all odds to provide a better life for his son.",
    poster: "https://image.tmdb.org/t/p/w500/bFzjdy6ucvNlXmJwoSoYfufV6lP.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=DMOBlEcRuw8",
    genres: ["Drama", "Biography"],
    releaseDate: "2006-12-15",
    language: "English"
  },
  {
    title: "Taare Zameen Par",
    mood: "sad",
    overview: "A dyslexic boy’s life changes when a compassionate art teacher discovers his true potential.",
    poster: "https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/51206127.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=tn_2Ie_jtX8",
    genres: ["Drama", "Family"],
    releaseDate: "2007-12-21",
    language: "Hindi"
  },
  {
    title: "Grave of the Fireflies",
    mood: "sad",
    overview: "Two siblings struggle to survive during World War II in Japan.",
    poster: "https://image.tmdb.org/t/p/w500/qG3RYlIVpTYclR9TYIsy8p7m7AT.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=4vPeTSRd580",
    genres: ["Animation", "Drama", "War"],
    releaseDate: "1988-04-16",
    language: "Japanese"
  },
  {
    title: "Manchester by the Sea",
    mood: "sad",
    overview: "A man returns to his hometown and confronts his tragic past and broken relationships.",
    poster: "https://image.tmdb.org/t/p/w500/rXsh4MI6uyVgZBSSzXCfitJnVPy.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=gsVoD0pTge0",
    genres: ["Drama"],
    releaseDate: "2016-12-16",
    language: "English"
  },
  {
    title: "My Name Is Khan",
    mood: "sad",
    overview: "An autistic man embarks on a journey to tell the President he is not a terrorist.",
    poster: "https://m.media-amazon.com/images/I/61U7UndYikL._AC_UF894,1000_QL80_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=YFQ-AfHqvSA",
    genres: ["Drama", "Romance"],
    releaseDate: "2010-02-12",
    language: "Hindi"
  },
  {
    title: "Hachi: A Dog's Tale",
    mood: "sad",
    overview: "A loyal dog continues to wait for his deceased owner every day for years.",
    poster: "https://image.tmdb.org/t/p/w500/lsy3aEsEfYIHdLRk4dontZ4s85h.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=tQ3ILe8xS5M",
    genres: ["Drama", "Family"],
    releaseDate: "2009-06-13",
    language: "English"
  },
  {
    title: "Alaipayuthey",
    mood: "sad",
    overview: "A young couple’s idealistic love faces harsh realities after marriage.",
    poster: "https://images.jdmagicbox.com/comp/jd_social/news/2018jul11/image-31003-egn0yjn5iv.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=svAowI2RQ0A",
    genres: ["Romance", "Drama"],
    releaseDate: "2000-04-14",
    language: "Tamil"
  },
  {
    title: "Life Is Beautiful",
    mood: "sad",
    overview: "A Jewish father uses humor to shield his son from the horrors of a concentration camp.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS11-7ps81wQzb62CQA7w-AmNCt4K8L23PZxQ&s",
    trailerUrl: "https://www.youtube.com/watch?v=pAYEQP8gx3w",
    genres: ["Comedy", "Drama", "War"],
    releaseDate: "1997-12-20",
    language: "Italian"
  },
  {
    title: "Dear Zindagi",
    mood: "sad",
    overview: "A young woman’s therapy sessions help her heal from emotional wounds and rediscover herself.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuSspzFNNFcBfL-wlH6ffVIqIDxg_4B0hZMQ&s",
    trailerUrl: "https://www.youtube.com/watch?v=5DkO7ksXY8E",
    genres: ["Drama", "Romance"],
    releaseDate: "2016-11-25",
    language: "Hindi"
  },
  {
    title: "Blue Valentine",
    mood: "sad",
    overview: "A married couple’s love unravels over time as their relationship falls apart.",
    poster: "https://i.pinimg.com/564x/0c/28/c9/0c28c9089dd1715b80b1703512e89947.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=seMwpP0yeu4",
    genres: ["Drama", "Romance"],
    releaseDate: "2010-12-29",
    language: "English"
  },
  {
    title: "96",
    mood: "sad",
    overview: "Two ex-lovers meet at a school reunion after 22 years and confront their unresolved feelings.",
    poster: "https://m.media-amazon.com/images/M/MV5BODFiZDk5MDgtMWMzNy00MTZmLTk2YTQtYjg1NzNmYzJlODJkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=r1J_wfuXJSU",
    genres: ["Romance", "Drama"],
    releaseDate: "2018-10-04",
    language: "Tamil"
  },
  {
    title: "The Green Mile",
    mood: "sad",
    overview: "A prison guard witnesses supernatural events surrounding an innocent man on death row.",
    poster: "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=Ki4haFrqSrw",
    genres: ["Drama", "Crime", "Fantasy"],
    releaseDate: "1999-12-10",
    language: "English"
  },
  {
    title: "I Am Sam",
    mood: "sad",
    overview: "A mentally challenged father fights to regain custody of his daughter.",
    poster: "https://humanehollywood.org/app/uploads/2020/02/9M24jRJetTjiw17kS4scTtlPoPl.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=99JvhkHpmE4",
    genres: ["Drama"],
    releaseDate: "2001-12-28",
    language: "English"
  },
  {
    title: "Sita Ramam",
    mood: "sad",
    overview: "An orphan soldier’s love story unfolds through letters left behind after his death.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuycYcANDSErLqcUxGPMDjdb6VxWiR78ywpA&s",
    trailerUrl: "https://www.youtube.com/watch?v=QJY6VwQNZbI",
    genres: ["Romance", "Drama"],
    releaseDate: "2022-08-05",
    language: "Telugu"
  },
  {
    title: "The Fault in Our Stars",
    mood: "sad",
    overview: "Two teenagers with cancer fall in love and experience life’s beauty and heartbreak.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkr322Uj8X3zYEgkaxVJp8chWV8EpkbwRT6A&s",
    trailerUrl: "https://www.youtube.com/watch?v=9ItBvH5J6ss",
    genres: ["Romance", "Drama"],
    releaseDate: "2014-06-06",
    language: "English"
  },
  {
    title: "Uyare",
    mood: "sad",
    overview: "A young woman dreams of becoming a pilot but faces a devastating acid attack.",
    poster: "https://m.media-amazon.com/images/M/MV5BY2RlM2Y1NTYtMTQzMC00MjQ4LTkxODktZmJkMzExY2RmZTMyXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=nA2vN3P1xhE",
    genres: ["Drama"],
    releaseDate: "2019-04-26",
    language: "Malayalam"
  },
  {
    title: "Miracle in Cell No. 7",
    mood: "sad",
    overview: "A mentally challenged father is wrongly imprisoned but keeps love alive for his daughter.",
    poster: "https://m.media-amazon.com/images/M/MV5BMzZmMWUxZGMtOTg3MS00OTA4LTg5NzktZGY4NjgyMzExYTZhXkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=wfmUpbT9N0s",
    genres: ["Drama", "Family"],
    releaseDate: "2013-01-23",
    language: "Korean"
  },
  {
    title: "Marley & Me",
    mood: "sad",
    overview: "A mischievous dog teaches his family life lessons about love and loss.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOn_Yo7NmS5xIq3551ofRe3pRiZ5txo5w8Aw&s",
    trailerUrl: "https://www.youtube.com/watch?v=VlbpFqLygWQ",
    genres: ["Comedy", "Drama", "Family"],
    releaseDate: "2008-12-25",
    language: "English"
  },
  {
    title: "P.S. I Love You",
    mood: "sad",
    overview: "A widow discovers letters left by her late husband to help her heal.",
    poster: "https://i.pinimg.com/736x/83/19/c2/8319c2963a472c0ce8e7d47bed693c9c.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=CZzW6_hR068",
    genres: ["Romance", "Drama"],
    releaseDate: "2007-12-21",
    language: "English"
  },
  {
    title: "The Boy in the Striped Pajamas",
    mood: "sad",
    overview: "An unlikely friendship forms between two boys separated by a concentration-camp fence.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVdt4SOtwn0Dx5_lkHwSICWaYeFx72DmuSmQ&s",
    trailerUrl: "https://www.youtube.com/watch?v=uN2AMzCZWkY",
    genres: ["Drama", "War"],
    releaseDate: "2008-05-07",
    language: "English"
  },
  {
    title: "Kaaka Muttai",
    mood: "sad",
    overview: "Two slum boys dream of tasting pizza while discovering life’s inequalities.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBcv4k59VgWf2fb4ltAFqrpbi9dlKUkwFFhw&s",
    trailerUrl: "https://www.youtube.com/watch?v=3uvyZ_p4oZk",
    genres: ["Drama", "Comedy"],
    releaseDate: "2015-06-05",
    language: "Tamil"
  },
  {
    title: "A Star Is Born",
    mood: "sad",
    overview: "A seasoned musician helps a young singer find fame while his own career declines.",
    poster: "https://image.tmdb.org/t/p/w500/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=nSbzyEJ8X9E",
    genres: ["Drama", "Romance", "Music"],
    releaseDate: "2018-10-05",
    language: "English"
  },
  {
    title: "Barbershop: Next Cut",
    mood: "sad",
    overview: "A heartfelt sequel showing unity and hope amidst social challenges.",
    poster: "https://m.media-amazon.com/images/S/pv-target-images/b88de671d9434e0fbebef5e12712b75fada91d13732d5b94b7dfc5aaaad6144e.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=oj3l6SDEY0Y",
    genres: ["Comedy", "Drama"],
    releaseDate: "2016-04-15",
    language: "English"
  },
  {
    title: "Neerja",
    mood: "sad",
    overview: "The courageous story of a flight attendant who sacrificed her life to save passengers.",
    poster: "https://images.jdmagicbox.com/comp/jd_social/news/2018aug08/image-233126-y8zxi1u0cz.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=J5gCE6jUqHU",
    genres: ["Biography", "Drama"],
    releaseDate: "2016-02-19",
    language: "Hindi"
  },
  {
    title: "The Notebook",
    mood: "sad",
    overview: "A poor young man and a rich young woman fall in love but are separated by fate.",
    poster: "https://outlettrends.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/12/20115614/135550-477c8e.webp",
    trailerUrl: "https://www.youtube.com/watch?v=FC6biTjEyZw",
    genres: ["Romance", "Drama"],
    releaseDate: "2004-06-25",
    language: "English"
  },
  {
    title: "Hope",
    mood: "sad",
    overview: "Based on a true story of a young girl’s trauma and a family’s resilience in Korea.",
    poster: "https://image.tmdb.org/t/p/original/pxPXYUFGFQTYAKp02W1Hyi7T3Qg.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=bnhIXqK1Nto",
    genres: ["Drama"],
    releaseDate: "2013-10-02",
    language: "Korean"
  },
  {
    title: "Guzaarish",
    mood: "sad",
    overview: "A quadriplegic magician fights for the right to end his life with dignity.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGN2rC1RCrpCeW-vfB1_MFo6jNUQq5TWUNcQ&s",
    trailerUrl: "https://www.youtube.com/watch?v=AOEOfUgM9Gg",
    genres: ["Drama", "Romance"],
    releaseDate: "2010-11-19",
    language: "Hindi"
  },
  {
    title: "Room",
    mood: "sad",
    overview: "A kidnapped woman and her son escape captivity and struggle to adjust to the outside world.",
    poster: "https://image.tmdb.org/t/p/w500/ekZobS8isE6mA53RAiGDG93hBxL.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=E_Ci-pAL4eE",
    genres: ["Drama", "Thriller"],
    releaseDate: "2015-10-16",
    language: "English"
  },
  {
    title: "Train to Busan",
    mood: "sad",
    overview: "A father fights to protect his daughter during a zombie outbreak on a train.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeKrrcz0sBcnmQcDsIU0wDeIL0ND3zXW7jsA&s",
    trailerUrl: "https://www.youtube.com/watch?v=pyWuHv2-Abk",
    genres: ["Action", "Horror", "Drama"],
    releaseDate: "2016-07-20",
    language: "Korean"
  },



  
  {
    title: 'Jai Bhim',
    mood: 'angry',
    overview: 'A lawyer fights for the rights of tribal people who are falsely accused by corrupt police officers.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2zK7saSdr-NiElNHo6agOwFccpvL_uFwvQ&s',
    trailerUrl: 'https://www.youtube.com/watch?v=nnXpbTFrqXA',
    genres: ['Drama', 'Crime', 'Social Justice'],
    releaseDate: '2021-11-02',
    language: 'Tamil'
  },
  {
    title: 'Article 15',
    mood: 'angry',
    overview: 'An honest police officer investigates caste-based crimes in rural India.',
    poster: 'https://m.media-amazon.com/images/M/MV5BYmNlMWYzN2MtODNhOC00ZTdhLTk3NzAtNzRkMTg3MWE4ZmJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=HKOYeWBgGOg',
    genres: ['Crime', 'Drama', 'Thriller'],
    releaseDate: '2019-06-28',
    language: 'Hindi'
  },
  {
    title: 'Sardar Udham',
    mood: 'angry',
    overview: 'A biopic of Udham Singh, who avenged the Jallianwala Bagh massacre by assassinating General Dyer.',
    poster: 'https://img.airtel.tv/unsafe/fit-in/1600x0/filters:format(webp)/https://xstreamcp-assets-msp.streamready.in/assets/MINITV/MOVIE/67463c573f161f1fc44fb8b7/images/LANDSCAPE_169/SARDAR-UDHAM_1920x1080_16x9.jpg?o=production',
    trailerUrl: 'https://www.youtube.com/watch?v=QpJx9nJX_bY',
    genres: ['History', 'Drama'],
    releaseDate: '2021-10-16',
    language: 'Hindi'
  },
  {
    title: 'Gangs of Wasseypur',
    mood: 'angry',
    overview: 'A brutal tale of revenge and power struggles between coal mafia families.',
    poster: 'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2012/06/15/Incoming/Pictures/872904_Wallpaper2.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=j-AkWDkXcMY',
    genres: ['Crime', 'Action', 'Drama'],
    releaseDate: '2012-06-22',
    language: 'Hindi'
  },
  {
    title: 'Joker',
    mood: 'angry',
    overview: 'A failed comedian’s descent into madness highlights social inequality.',
    poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=zAGVQLHvwOY',
    genres: ['Drama', 'Thriller'],
    releaseDate: '2019-10-04',
    language: 'English'
  },
  {
    title: 'Hotel Rwanda',
    mood: 'angry',
    overview: 'A hotel manager shelters Tutsi refugees during the Rwandan genocide.',
    poster: 'https://m.media-amazon.com/images/I/51X4Ick7VcL._AC_UF894,1000_QL80_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=RzxKpVk2QYg',
    genres: ['History', 'Drama', 'War'],
    releaseDate: '2004-09-02',
    language: 'English'
  },
  {
    title: 'Raazi',
    mood: 'angry',
    overview: 'An Indian spy marries a Pakistani officer to relay classified information during wartime.',
    poster: 'https://www.filmibeat.com/wimg/desktop/2018/04/raazi_152447995530.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=YjMSttRJrhA',
    genres: ['Thriller', 'Drama'],
    releaseDate: '2018-05-11',
    language: 'Hindi'
  },
  {
    title: 'Kantara',
    mood: 'angry',
    overview: 'A divine folklore clash between forest people and government over land rights.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkVJ0mHqtGPfyuOJNc7XbaPdw2GXm0A8WrLQ&s',
    trailerUrl: 'https://www.youtube.com/watch?v=ppYoIoW73PI',
    genres: ['Action', 'Mystery', 'Thriller'],
    releaseDate: '2022-09-30',
    language: 'Kannada'
  },
  {
    title: 'V for Vendetta',
    mood: 'angry',
    overview: 'A masked vigilante fights against totalitarian oppression in futuristic Britain.',
    poster: 'https://w0.peakpx.com/wallpaper/506/841/HD-wallpaper-movie-v-for-vendetta-natalie-portman-thumbnail.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=lSA7mAHolAw',
    genres: ['Action', 'Thriller'],
    releaseDate: '2006-03-17',
    language: 'English'
  },
  {
    title: 'Asuran',
    mood: 'angry',
    overview: 'A farmer fights caste oppression and police brutality to protect his family.',
    poster: 'https://upload.wikimedia.org/wikipedia/en/7/78/Asuran_2019_poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=vOCM9wztBYQ',
    genres: ['Action', 'Drama'],
    releaseDate: '2019-10-04',
    language: 'Tamil'
  },
  {
    title: "Vikram Vedha",
    mood: "angry",
    overview: "A police officer sets out to track down a dangerous gangster, but their cat-and-mouse chase reveals moral grayness.",
    poster: "https://stat4.bollywoodhungama.in/wp-content/uploads/2021/07/Vikram-Vedha.webp",
    trailerUrl: "https://www.youtube.com/watch?v=1sVr-uWZPjE",
    genres: ["Action", "Thriller"],
    releaseDate: "2017-07-21"
  },
  {
    title: "John Wick",
    mood: "angry",
    overview: "An ex-hitman comes out of retirement to seek vengeance for his beloved dog's death.",
    poster: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=C0BMx-qxsP4",
    genres: ["Action", "Crime", "Thriller"],
    releaseDate: "2014-10-24"
  },
  {
    title: "Ghajini",
    mood: "angry",
    overview: "A man suffering from short-term memory loss uses tattoos and notes to hunt down his lover’s killer.",
    poster: "https://resizing.flixster.com/ueNRsOH7LkB7prJtQgg0oTYNt-g=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p191083_v_h8_ab.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=z2X2HaTvkl8",
    genres: ["Action", "Thriller"],
    releaseDate: "2008-12-25"
  },
  {
    title: "Vikram",
    mood: "angry",
    overview: "A black ops team is on a mission to track down a masked vigilante with a personal vendetta.",
    poster: "https://m.media-amazon.com/images/M/MV5BMmViYjExY2UtMzZjOS00OGQ2LWEzNWYtNGYxY2NkY2RmMDE3XkEyXkFqcGc@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=OKBMCL-frPU",
    genres: ["Action", "Crime", "Thriller"],
    releaseDate: "2022-06-03"
  },
  {
    title: "Gladiator",
    mood: "angry",
    overview: "A betrayed Roman general rises as a gladiator to seek revenge against the corrupt emperor.",
    poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=owK1qxDselE",
    genres: ["Action", "Drama"],
    releaseDate: "2000-05-05"
  },
  {
    title: "Kaithi",
    mood: "angry",
    overview: "A prisoner on parole helps the police save a city from a gang of drug lords.",
    poster: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b4a1ba87123937.5daeb6af5f27c.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=GfP1Ch3H8Ug",
    genres: ["Action", "Thriller"],
    releaseDate: "2019-10-25"
  },
  {
    title: "Singham",
    mood: "angry",
    overview: "An honest cop takes on a corrupt politician who thinks he’s above the law.",
    poster: "https://media5.bollywoodhungama.in/wp-content/uploads/2016/03/singham-Poster-Feature.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=1qZME9A8l4s",
    genres: ["Action", "Drama"],
    releaseDate: "2011-07-22"
  },
  {
    title: "The Dark Knight",
    mood: "angry",
    overview: "Batman faces chaos unleashed by the Joker, testing his moral boundaries and resolve.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    genres: ["Action", "Crime", "Drama"],
    releaseDate: "2008-07-18"
  },
  {
    title: "Oldboy",
    mood: "angry",
    overview: "After 15 years of imprisonment, a man is released and seeks vengeance on his captor.",
    poster: "https://image.tmdb.org/t/p/w500/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=2HkjrJ6IK5E",
    genres: ["Thriller", "Mystery", "Drama"],
    releaseDate: "2003-11-21"
  },
  {
    title: 'The Kashmir Files',
    mood: 'angry',
    overview: 'Based on the exodus of Kashmiri Pandits in the 1990s, exploring the pain and injustice faced by them.',
    poster: 'https://c.ndtvimg.com/2022-03/cjanvhn_the-kashmir-files-box-office-collection-day-5_625x300_16_March_22.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=A179apttY58',
    genres: ['Drama', 'History'],
    releaseDate: '2022-03-11',
    language: 'Hindi'
  },
  {
    title: 'The Hate U Give',
    mood: 'angry',
    overview: 'A young girl witnesses the fatal shooting of her best friend by a police officer.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO2m1tKLgqHdsaL3P0e-elVpaAPoUU6OVx1Q&s',
    trailerUrl: 'https://www.youtube.com/watch?v=3MM8OkVT0hw',
    genres: ['Drama', 'Crime'],
    releaseDate: '2018-10-05',
    language: 'English'
  },
  {
    title: 'Super Deluxe',
    mood: 'angry',
    overview: 'Multiple stories intertwine, exposing hypocrisy, injustice, and human emotions.',
    poster: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Super_Deluxe_film_poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=7naOvVxTpsU',
    genres: ['Drama', 'Crime'],
    releaseDate: '2019-03-29',
    language: 'Tamil'
  },
  {
    title: 'The Great Indian Kitchen',
    mood: 'angry',
    overview: 'A newly married woman struggles to adjust to patriarchal expectations and gender roles.',
    poster: 'https://m.media-amazon.com/images/M/MV5BNTllZjlhMTItNTkzOC00Nzk0LWFiZGItZDNjOTM0ZGFjMjI0XkEyXkFqcGc@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=7Vz_qx1N53c',
    genres: ['Drama', 'Feminism'],
    releaseDate: '2021-01-15',
    language: 'Malayalam'
  },
  {
    title: 'Rang De Basanti',
    mood: 'angry',
    overview: 'A group of Indian students are inspired to fight corruption after a personal tragedy.',
    poster: 'https://m.media-amazon.com/images/I/71TRjpEYdFL._AC_UF894,1000_QL80_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=lByGzYVdO7w',
    genres: ['Drama', 'Revolution'],
    releaseDate: '2006-01-26',
    language: 'Hindi'
  },
  {
    title: 'The Revenant',
    mood: 'angry',
    overview: 'A frontiersman fights for survival and revenge after being left for dead.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrZLKPVKoTJfcRcKwrnwmV7t8dJ9ECXkKemw&s',
    trailerUrl: 'https://www.youtube.com/watch?v=LoebZZ8K5N0',
    genres: ['Action', 'Adventure'],
    releaseDate: '2015-12-25',
    language: 'English'
  },
  {
    title: 'Visaranai',
    mood: 'angry',
    overview: 'A brutal depiction of police torture and corruption in India.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBpez6W4x57rM6LDXk9S8SCje6cj_DVJbx-w&s',
    trailerUrl: 'https://www.youtube.com/watch?v=8d5QEWdHchk',
    genres: ['Crime', 'Drama'],
    releaseDate: '2016-02-05',
    language: 'Tamil'
  },
  {
    title: 'Madras Café',
    mood: 'angry',
    overview: 'A spy thriller set against the Sri Lankan civil war backdrop.',
    poster: 'https://www.koimoi.com/wp-content/new-galleries/2020/06/madras-cafe-box-office-heres-the-daily-breakdown-of-john-abrahams-2013-action-thriller-001.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=y6OC3bKZ1EQ',
    genres: ['Action', 'Thriller'],
    releaseDate: '2013-08-23',
    language: 'Hindi'
  },
  {
    title: 'Swades',
    mood: 'angry',
    overview: 'A NASA scientist returns to India and fights for rural development and empowerment.',
    poster: 'https://wallpapercave.com/wp/wp6186713.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=NC7NFQ4eXhA',
    genres: ['Drama', 'Social'],
    releaseDate: '2004-12-17',
    language: 'Hindi'
  },
  {
    title: 'Blood Diamond',
    mood: 'angry',
    overview: 'A fisherman and a smuggler join forces against the illegal diamond trade.',
    poster: 'https://images.moviesanywhere.com/4c5c04f50ed0a6ddc2d290c4b6acf903/18a79a70-b15a-461a-b242-06cc1e8f5837.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=yknIZsvQjG4',
    genres: ['Drama', 'Action'],
    releaseDate: '2006-12-08',
    language: 'English'
  },



  
  {
    title: "Inception",
    mood: "thrilled",
    overview: "A thief who steals corporate secrets through dream-sharing technology must plant an idea into a target's mind.",
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    genres: ["Action", "Sci-Fi", "Thriller"],
    releaseDate: "2010-07-16"
  },
  {
    title: "Drishyam",
    mood: "thrilled",
    overview: "A man goes to extreme lengths to protect his family after they become embroiled in a crime.",
    poster: "https://m.media-amazon.com/images/I/714kDfwueCL.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=AuuX2j14NBg",
    genres: ["Thriller", "Drama", "Crime"],
    releaseDate: "2015-07-31"
  },
  {
    title: "Parasite",
    mood: "thrilled",
    overview: "A poor family infiltrates a wealthy household, but things spiral into chaos.",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    genres: ["Thriller", "Drama"],
    releaseDate: "2019-05-30"
  },
  {
    title: "Kantara",
    mood: "thrilled",
    overview: "A clash between man and nature unfolds in a village where divine legends come alive.",
    poster: "https://stat4.bollywoodhungama.in/wp-content/uploads/2022/10/Kantara-1.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=ppYoIoW73PI",
    genres: ["Thriller", "Drama", "Mythology"],
    releaseDate: "2022-09-30"
  },
  {
    title: "Interstellar",
    mood: "thrilled",
    overview: "Explorers travel through a wormhole in space to ensure humanity’s survival.",
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    genres: ["Adventure", "Sci-Fi", "Drama"],
    releaseDate: "2014-11-07"
  },
  {
    title: "Kahaani",
    mood: "thrilled",
    overview: "A pregnant woman’s search for her missing husband leads to shocking secrets.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoPVv4W0d-KoTKhxSvDJHFFhV1JC2YwIJe0Q&s",
    trailerUrl: "https://www.youtube.com/watch?v=j1wEeuAosNM",
    genres: ["Thriller", "Mystery"],
    releaseDate: "2012-03-09"
  },
  {
    title: "Tenet",
    mood: "thrilled",
    overview: "A secret agent manipulates time to prevent World War III.",
    poster: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=LdOM0x0XDMo",
    genres: ["Action", "Sci-Fi", "Thriller"],
    releaseDate: "2020-08-26"
  },
  {
    title: "13B: Fear Has a New Address",
    mood: "thrilled",
    overview: "A man discovers that his TV soap mirrors his family’s lives, revealing eerie truths.",
    poster: "https://i.ytimg.com/vi/Qerq6nKaFn0/maxresdefault.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=trZzEzh8bCk",
    genres: ["Horror", "Thriller"],
    releaseDate: "2009-03-06"
  },
    {
    title: 'Papanasam',
    mood: 'thrilled',
    overview: 'A remake of Drishyam in Tamil, showcasing family and suspense.',
    poster: 'https://content1.jdmagicbox.com/comp/jd_social/news/2018aug07/image-202106-qw09cyedl9.jpg?fit=around|140:205&crop=140:205;*,*',
    trailerUrl: 'https://www.youtube.com/watch?v=SzsxHekKz3g',
    genres: ['Thriller', 'Drama'],
    releaseDate: '2015-07-03',
    language: 'Tamil'
  },
    {
    title: 'Ratsasan',
    mood: 'thrilled',
    overview: 'A psychological thriller where a filmmaker-turned-cop hunts a serial killer targeting schoolgirls.',
    poster: 'https://lh5.googleusercontent.com/proxy/Ix-HXlapdpWu58m9nAbBUmA8p9dTtD3CmnpEVHxgEQJVCaVJ7l-0IDJKOlA00N2Rb_qAnPLSaLhgZWQylbSIdpPgzOIPbbgz4zjHFKuWaEmNtsvhbw',
    trailerUrl: 'https://www.youtube.com/watch?v=Gsrpp3c4bsE',
    genres: ['Thriller', 'Crime'],
    releaseDate: '2018-10-05',
    language: 'Tamil'
  },
  {
    title: 'Andhadhun',
    mood: 'thrilled',
    overview: 'A blind pianist becomes entangled in a series of mysterious murders.',
    poster: 'https://upload.wikimedia.org/wikipedia/en/4/47/Andhadhun_poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=2iVYI99VGaw',
    genres: ['Thriller', 'Comedy', 'Crime'],
    releaseDate: '2018-10-05',
    language: 'Hindi'
  },
  {
    title: 'Shutter Island',
    mood: 'thrilled',
    overview: 'Two US marshals investigate a psychiatric facility on an isolated island.',
    poster: 'https://image.tmdb.org/t/p/w500/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=5iaYLCiq5RM',
    genres: ['Mystery', 'Thriller'],
    releaseDate: '2010-02-19',
    language: 'English'
  },
  {
    title: 'Anjaam Pathiraa',
    mood: 'thrilled',
    overview: 'A criminal psychologist investigates serial murders targeting police officers.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvGKVWtMXyUO3wY7ll56tUhTdZ4O86J-LjIw&s',
    trailerUrl: 'https://www.youtube.com/watch?v=7vU2k6PMW0A',
    genres: ['Thriller', 'Crime'],
    releaseDate: '2020-01-10',
    language: 'Malayalam'
  },
  {
    title: 'Kantara 2 (Upcoming)',
    mood: 'thrilled',
    overview: 'A divine prequel exploring the roots of the folklore and deity powers.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc7wD-wX-W6FQiGBk_wXA1EZmzBiwBB_ONHA&s',
    trailerUrl: 'https://www.youtube.com/watch?v=zG8l2rRko6I',
    genres: ['Action', 'Thriller', 'Mythology'],
    releaseDate: '2025-08-15',
    language: 'Kannada'
  },
  {
    title: 'Psycho',
    mood: 'thrilled',
    overview: 'A blind musician tries to rescue his kidnapped lover from a psychopathic serial killer.',
    poster: 'https://m.media-amazon.com/images/I/91MwgtvMuoL.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=wB_tRP4TzBo',
    genres: ['Thriller', 'Psychological'],
    releaseDate: '2020-01-24',
    language: 'Tamil'
  },
  {
    title: 'The Prestige',
    mood: 'thrilled',
    overview: 'Two rival magicians compete to create the greatest illusion, blurring the lines between science and obsession.',
    poster: 'https://w0.peakpx.com/wallpaper/1009/1021/HD-wallpaper-movie-the-prestige-christian-bale-hugh-jackman.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=o4gHCmTQDVI',
    genres: ['Thriller', 'Drama', 'Mystery'],
    releaseDate: '2006-10-20',
    language: 'English'
  },
  {
    title: 'Karthikeya 2',
    mood: 'thrilled',
    overview: 'An adventurous thriller exploring ancient secrets and mysteries of Lord Krishna.',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemiYakR7WqHTW29ceayfMX5Wu1ypKCBH3iQ&s',
    trailerUrl: 'https://www.youtube.com/watch?v=5C5-mHZx3Mo',
    genres: ['Adventure', 'Thriller'],
    releaseDate: '2022-08-13',
    language: 'Telugu'
  },
  {
    title: 'Interstellar',
    mood: 'thrilled',
    overview: 'A team of explorers travel through a wormhole in space to ensure humanity’s survival.',
    poster: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    genres: ['Sci-Fi', 'Adventure'],
    releaseDate: '2014-11-07',
    language: 'English'
  },
  {
    title: 'Lucifer',
    mood: 'thrilled',
    overview: 'A political thriller where a power struggle unfolds after the death of a party leader.',
    poster: 'https://m.media-amazon.com/images/M/MV5BODIwNTc3NjAtODY5OS00YjcxLWE0ZWYtY2NmOWZiMGIwZTBjXkEyXkFqcGc@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=Zm2K2pFhJjM',
    genres: ['Action', 'Thriller'],
    releaseDate: '2019-03-28',
    language: 'Malayalam'
  },
  {
    title: 'Dhuruvangal Pathinaaru',
    mood: 'thrilled',
    overview: 'A retired cop recounts the most mysterious case of his career.',
    poster: 'https://upload.wikimedia.org/wikipedia/en/3/35/Dhuruvangal_Pathinaaru_Poster.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=lw5W0sFTQv8',
    genres: ['Crime', 'Thriller'],
    releaseDate: '2016-12-29',
    language: 'Tamil'
  },
  {
    title: 'Edge of Tomorrow',
    mood: 'thrilled',
    overview: 'A soldier relives the same day over and over while fighting alien invaders.',
    poster: 'https://image.tmdb.org/t/p/w500/uUHvlkLavotfGsNtosDy8ShsIYF.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=vw61gCe2oqI',
    genres: ['Sci-Fi', 'Action'],
    releaseDate: '2014-05-28',
    language: 'English'
  },
  {
    title: 'Vikram',
    mood: 'thrilled',
    overview: 'A high-octane action thriller involving masked vigilantes, gangsters, and police.',
    poster: 'https://image.tmdb.org/t/p/w500/7LEI8ulZzO5gy9Ww2NVCrKmHeDZ.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=OKBMCL-frPU',
    genres: ['Action', 'Thriller'],
    releaseDate: '2022-06-03',
    language: 'Tamil'
  },
  {
    title: 'Memories',
    mood: 'thrilled',
    overview: 'A former police officer battles alcoholism while solving a mysterious serial killer case.',
    poster: 'https://m.media-amazon.com/images/M/MV5BZWRjMTU0NDQtYTY5OS00MTUzLTliYTAtMTliNmNkNWI0NDJjXkEyXkFqcGc@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=mgwAGq7D_S8',
    genres: ['Thriller', 'Mystery'],
    releaseDate: '2013-08-09',
    language: 'Malayalam'
  }








];

async function seed() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsAllowInvalidCertificates: true
    });

    console.log('✅ Connected to MongoDB');
    console.log('🧹 Clearing old movies...');
    await MovieModel.deleteMany();

    console.log('🎬 Inserting new movies...');
    await MovieModel.insertMany(seedMovies);

    console.log('✅ Movies seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);

  }
}

seed();





