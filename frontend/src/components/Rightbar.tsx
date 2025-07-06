import { Calendar, ChevronDown, ChevronUp, Gift, Users } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import ImageWrapper from "./ImageWrapper";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

interface GroupChat {
  id: string;
  name: string;
  members: string[];
  lastMessage: string;
  timestamp: string;
  isActive: boolean;
}

interface Suggestion {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  type: "friend" | "page" | "group";
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  image: string;
}

const ContactItem = React.memo<{
  contact: Contact;
}>(({ contact }) => {
  return (
    <div
      className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 group hover:bg-background-secondary`}
    >
      <div className="relative">
        <ImageWrapper
          src={contact.avatar}
          alt={contact.name}
          width={32}
          height={32}
          containerClassName="rounded-full"
          className="object-contain"
        />
        {contact.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
        )}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{contact.name}</p>
        {!contact.isOnline && contact.lastSeen && (
          <p className="text-xs text-text-muted truncate">{contact.lastSeen}</p>
        )}
      </div>
    </div>
  );
});

const GroupChatItem = React.memo<{ group: GroupChat }>(({ group }) => (
  <div className="flex items-center p-2 rounded-lg hover:bg-background-secondary cursor-pointer group">
    <div className="relative">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <Users className="w-4 h-4 text-slate-50" />
      </div>
      {group.isActive && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
      )}
    </div>
    <div className="ml-3 flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{group.name}</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-text-muted truncate flex-1">
          {group.lastMessage}
        </p>
        <span className="text-xs text-text-muted whitespace-nowrap max-w-12 truncate flex-shrink-0">
          {group.timestamp}
        </span>
      </div>
    </div>
  </div>
));

const SuggestionItem = React.memo<{ suggestion: Suggestion }>(
  ({ suggestion }) => (
    <div className="flex items-center p-2 rounded-lg hover:bg-background-secondary cursor-pointer">
      <ImageWrapper
        src={suggestion.avatar}
        alt={suggestion.name}
        width={32}
        height={32}
        containerClassName="rounded-full"
        className="object-cover"
      />
      <div className="ml-3 flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{suggestion.name}</p>
        <p className="text-xs text-text-muted truncate">
          {suggestion.mutualFriends} bạn chung
        </p>
      </div>
      <button className="px-3 py-1 ml-2 bg-primary text-white text-xs rounded-md hover:bg-primary-hover transition-colors">
        Kết bạn
      </button>
    </div>
  )
);

const EventItem = React.memo<{ event: Event }>(({ event }) => (
  <div className="flex items-center -mx-2 p-2 rounded-lg hover:bg-background-secondary cursor-pointer">
    <ImageWrapper
      src={event.image}
      alt={event.title}
      width={40}
      height={40}
      containerClassName="rounded-lg"
      className="object-cover"
    />
    <div className="ml-3 flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{event.title}</p>
      <p className="text-xs text-text-muted truncate">
        {event.date} • {event.time}
      </p>
      <p className="text-xs text-text-muted truncate">
        {event.attendees} người tham gia
      </p>
    </div>
  </div>
));

const Tab = React.memo<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}>(({ active, onClick, children }) => (
  <button
    className={`flex-1 cursor-pointer py-3 px-4 text-sm transition-none font-semibold ${
      active ? "text-primary border-b-2 border-primary" : "text-text-secondary"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
));

const Section = React.memo<{
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}>(({ title, icon, isExpanded, onToggle, children }) => (
  <div className="p-4 border-t border-border">
    <div
      className={`flex items-center justify-between cursor-pointer ${
        isExpanded ? "mb-3" : ""
      }`}
      onClick={onToggle}
    >
      <h3 className="text-sm font-semibold flex items-center">
        {icon}
        {title}
      </h3>
      {isExpanded ? (
        <ChevronUp className="w-4 h-4 text-text-secondary" />
      ) : (
        <ChevronDown className="w-4 h-4 text-text-secondary" />
      )}
    </div>
    {isExpanded && children}
  </div>
));

const Rightbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "contacts" | "groups" | "suggestions"
  >("contacts");
  const [isBirthdayExpanded, setIsBirthdayExpanded] = useState(true);
  const [isEventsExpanded, setIsEventsExpanded] = useState(true);

  // Static data - moved outside component or use useMemo for complex calculations
  const contacts: Contact[] = useMemo(
    () => [
      {
        id: "1",
        name: "Nguyễn Văn An",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: "2",
        name: "Trần Thị Bình",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: "3",
        name: "Lê Minh Châu",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
        lastSeen: "2 giờ trước",
      },
      {
        id: "4",
        name: "Phạm Thị Dung",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        isOnline: true,
      },
      {
        id: "5",
        name: "Hoàng Văn Em",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        isOnline: false,
        lastSeen: "1 ngày trước",
      },
    ],
    []
  );

  const groupChats: GroupChat[] = useMemo(
    () => [
      {
        id: "1",
        name: "Nhóm Bạn Cùng Lớp",
        members: ["An", "Bình", "Châu", "Dung"],
        lastMessage: "Hôm nay đi cafe không?",
        timestamp: "10:30",
        isActive: true,
      },
      {
        id: "2",
        name: "Team Dự Án",
        members: ["Manager", "Dev1", "Dev2", "Designer"],
        lastMessage: "Deadline cuối tuần nhé!",
        timestamp: "10 tháng trước",
        isActive: false,
      },
    ],
    []
  );

  const suggestions: Suggestion[] = useMemo(
    () => [
      {
        id: "1",
        name: "Đỗ Văn Phúc",
        avatar:
          "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
        mutualFriends: 12,
        type: "friend",
      },
      {
        id: "2",
        name: "Công Ty ABC",
        avatar:
          "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=40&h=40&fit=crop&crop=center",
        mutualFriends: 5,
        type: "page",
      },
    ],
    []
  );

  const events: Event[] = useMemo(
    () => [
      {
        id: "1",
        title: "Sinh nhật Minh Châu",
        date: "15/07",
        time: "19:00",
        attendees: 12,
        image:
          "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=60&h=60&fit=crop",
      },
      {
        id: "2",
        title: "Họp mặt cuối tuần",
        date: "20/07",
        time: "10:00",
        attendees: 8,
        image:
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=60&h=60&fit=crop",
      },
    ],
    []
  );

  const handleTabChange = useCallback(
    (tab: "contacts" | "groups" | "suggestions") => {
      setActiveTab(tab);
    },
    []
  );

  const toggleBirthday = useCallback(() => {
    setIsBirthdayExpanded((prev) => !prev);
  }, []);

  const toggleEvents = useCallback(() => {
    setIsEventsExpanded((prev) => !prev);
  }, []);

  // Memoized tab handlers
  const handleContactsTab = useCallback(
    () => handleTabChange("contacts"),
    [handleTabChange]
  );
  const handleGroupsTab = useCallback(
    () => handleTabChange("groups"),
    [handleTabChange]
  );
  const handleSuggestionsTab = useCallback(
    () => handleTabChange("suggestions"),
    [handleTabChange]
  );

  // Memoized content
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "contacts":
        return (
          <div className="space-y-1 max-h-72 overflow-y-auto">
            {contacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </div>
        );
      case "groups":
        return (
          <div className="space-y-1 max-h-72 overflow-y-auto">
            {groupChats.map((group) => (
              <GroupChatItem key={group.id} group={group} />
            ))}
          </div>
        );
      case "suggestions":
        return (
          <div className="space-y-1 max-h-72 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <SuggestionItem key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        );
      default:
        return null;
    }
  }, [activeTab, contacts, groupChats, suggestions]);

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-border">
        <Tab active={activeTab === "contacts"} onClick={handleContactsTab}>
          Bạn bè
        </Tab>
        <Tab active={activeTab === "groups"} onClick={handleGroupsTab}>
          Nhóm
        </Tab>
        <Tab
          active={activeTab === "suggestions"}
          onClick={handleSuggestionsTab}
        >
          Gợi ý
        </Tab>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto max-h-72 p-2">{tabContent}</div>

      {/* Birthday Section */}
      <Section
        title="Sinh nhật"
        icon={<Gift className="w-4 h-4 mr-2 text-primary" />}
        isExpanded={isBirthdayExpanded}
        onToggle={toggleBirthday}
      >
        <div className="text-xs text-text-muted">
          <span className="font-medium">Trần Thị Bình</span> và{" "}
          <span className="font-medium">2 người khác</span> có sinh nhật hôm nay
        </div>
      </Section>

      {/* Events Section */}
      <Section
        title="Sự kiện"
        icon={<Calendar className="w-4 h-4 mr-2 text-secondary" />}
        isExpanded={isEventsExpanded}
        onToggle={toggleEvents}
      >
        <div className="space-y-2">
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Rightbar;
