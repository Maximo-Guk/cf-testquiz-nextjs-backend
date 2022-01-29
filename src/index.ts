import { Router } from 'itty-router';
import Quiz from './classes/Quiz';
import User from './classes/User';
import ValidationError from './classes/ValidationError';
import uuidValidateV1 from './components/uuidValidateV1';
import validateJson from './components/validateJson';

// const devUser = new User('baf4d3e0-8140-11ec-be62-77db812d0b2c', 0, 0);

// Create a new router
const router = Router();

// return 200 when client is getting server options during cors
router.options('*', () => {
  return new Response();
});

router.get('/api/quiz', async (request: Request) => {
  const user = User.newUser();
  await user.addToCache(request.url);

  return new Response(user.toString());
});

router.all('/api/quiz/:uuid', (request: Request) => {
  if (!uuidValidateV1(request.url.split('/')[5])) {
    return new Response('Invalid uuid.', { status: 400 });
  }
});

router.get('/api/quiz/:uuid', async (request: Request) => {
  const user = await User.getUserFromCache(request.url);

  if (user) {
    return new Response(Quiz.getQuestionForUser(user));
  }
});

router.post('/api/quiz/:uuid', async (request: Request) => {
  try {
    const requestJson = await validateJson(request);
    if (!requestJson.answer) {
      return new Response('Missing answer from request.', { status: 400 });
    }

    const user = await User.getUserFromCache(request.url);

    if (user) {
      const isAnswerCorrect = Quiz.checkUserAnswerIsCorrect(user, requestJson.answer);

      if (isAnswerCorrect) {
        user.updateCache(request.url);
      } else {
        user.removeFromCache(request.url);
      }

      return new Response(
        JSON.stringify({ answer: isAnswerCorrect, age: user.getAge() }),
      );
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return new Response(error.message, { status: error.code });
    }
    throw error;
  }
});

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).
Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => new Response('404, not found!', { status: 404 }));

/*
This snippet ties our worker to the router we defined above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request));
});
