import { Router } from 'itty-router';
import Quiz from './classes/Quiz';
import User from './classes/User';
import ValidationError from './classes/ValidationError';
import cors from './components/cors';
import uuidValidateV1 from './components/uuidValidateV1';
import validateJson from './components/validateJson';

// Create a new router
const router = Router();

// return 200 when client is getting server options during cors
router.options('*', () => {
  return cors(new Response());
});

router.get('/api/quiz', async (request: Request) => {
  const user = User.newUser();
  await user.addToCache(request.url);

  return cors(new Response(JSON.stringify({ uuid: user.getUuid() })));
});

router.all('/api/quiz/:uuid', (request: Request) => {
  if (!uuidValidateV1(request.url.split('/')[5])) {
    return cors(new Response('Invalid uuid.', { status: 400 }));
  }
});

router.get('/api/quiz/:uuid', async (request: Request) => {
  const user = await User.getUserFromCache(request.url);

  if (user) {
    return cors(new Response(Quiz.getQuestionForUser(user)));
  }
});

router.post('/api/quiz/:uuid', async (request: Request) => {
  try {
    const requestJson = await validateJson(request);
    if (!requestJson.answer) {
      return cors(new Response('Missing answer from request.', { status: 400 }));
    }

    const user = await User.getUserFromCache(request.url);

    if (user) {
      const isAnswerCorrect = Quiz.checkUserAnswerIsCorrect(user, requestJson.answer);

      if (isAnswerCorrect) {
        user.updateCache(request.url);
      } else {
        user.removeFromCache(request.url);
      }

      return cors(new Response(JSON.stringify({ answer: isAnswerCorrect })));
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return cors(new Response(error.message, { status: error.code }));
    }
    throw error;
  }
});

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).
Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => cors(new Response('404, not found!', { status: 404 })));

/*
This snippet ties our worker to the router we defined above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request));
});
