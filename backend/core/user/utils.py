from user_agents import parse

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


class UserAgent:
    def __init__(self, ua_string):
        user_agent = parse(ua_string)
        self.browser = user_agent.browser.family
        self.os = user_agent.os.family
        self.device = user_agent.device.family


def get_client_agent(request):
    ua_string = request.META.get('HTTP_USER_AGENT')
    return UserAgent(ua_string)
