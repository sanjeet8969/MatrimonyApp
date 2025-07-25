import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Avatar from '../ui/Avatar';

const ProfileModeration = ({ profile, onApprove, onReject }) => (
  <Card className="p-6 flex items-center space-x-4">
    <Avatar src={profile.photo} name={profile.name} size="lg" />
    <div className="flex-1">
      <h3 className="font-semibold text-gray-900">{profile.name}</h3>
      <p className="text-sm text-gray-600">{profile.email}</p>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{profile.about}</p>
    </div>
    <div className="space-x-2">
      <Button size="sm" variant="success" onClick={() => onApprove(profile.id)}>
        Approve
      </Button>
      <Button size="sm" variant="danger" onClick={() => onReject(profile.id)}>
        Reject
      </Button>
    </div>
  </Card>
);
export default ProfileModeration;
