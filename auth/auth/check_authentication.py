import jwt
from rest_framework.exceptions import AuthenticationFailed


class CheckAuthentication:
    def app_authuntication(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secret', algorithms=["HS256"])
            # print(payload)
            return payload
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
